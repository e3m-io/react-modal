import { useEffect, type RefObject } from "react";

export const useClickOutsideHandler = (
	enabled: boolean,
	dialogElRef: RefObject<HTMLDialogElement | null>,
	isOpen: boolean,
	onOutsideClick: () => void,
) => {
	useEffect(() => {
		const dialogEl = dialogElRef.current;

		if (!enabled || !dialogEl || !isOpen) {
			return;
		}

		let pendingClickTarget: EventTarget | null = null;

		const handleMouseDown = (e: MouseEvent) => {
			if (e.target === dialogEl && e.button === 0) {
				pendingClickTarget = e.target;
			} else {
				pendingClickTarget = null;
			}
		};

		const handleMouseUp = (e: MouseEvent) => {
			if (
				e.target === dialogEl &&
				e.button === 0 &&
				pendingClickTarget === dialogEl
			) {
				onOutsideClick();
			}
			pendingClickTarget = null;
		};

		// https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html
		dialogEl.addEventListener("mousedown", handleMouseDown);
		dialogEl.addEventListener("mouseup", handleMouseUp);

		return () => {
			dialogEl.removeEventListener("mousedown", handleMouseDown);
			dialogEl.removeEventListener("mouseup", handleMouseUp);
		};
	}, [onOutsideClick, isOpen, enabled]);
};
