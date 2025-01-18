import { useEffect, type RefObject } from "react";

/**
 * Translates the modal's React `isOpen` state
 * to native <dialog> methods and listens for native
 * <dialog> events that affect `isOpen`
 */
export const useDialogElState = (
	dialogElRef: RefObject<HTMLDialogElement | null>,
	isOpen: boolean,
	onCancel: () => void,
) => {
	useEffect(() => {
		if (!isOpen) {
			dialogElRef.current?.close();
		} else {
			dialogElRef.current?.showModal();
		}
	}, [isOpen]);

	useEffect(() => {
		const dialogEl = dialogElRef.current;

		if (!dialogEl) {
			return;
		}

		const closeHandler: EventListener = (event) => {
			event.preventDefault();
			onCancel();
		};

		dialogEl.addEventListener("cancel", closeHandler);

		return () => {
			dialogEl.removeEventListener("cancel", closeHandler);
		};
	}, [onCancel, isOpen]);
};
