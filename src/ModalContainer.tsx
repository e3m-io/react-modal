import { useRef, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { useDialogElState } from "./useDialogElState.ts";
import { useClickOutsideHandler } from "./useClickOutsideHandler.ts";
import type { useModalContainer } from "./useModalContainer.tsx";

type ModalContainerProps = ReturnType<typeof useModalContainer> &
	ComponentProps<"dialog"> & {
		closeOnOutsideClick?: boolean;
		container?: Element | DocumentFragment;
	};

export const ModalContainer = (props: ModalContainerProps) => {
	const { open, close, isOpen, closeOnOutsideClick, container, ...rest } =
		props;

	const dialogElRef = useRef<HTMLDialogElement>(null);

	useDialogElState(dialogElRef, isOpen, close);
	useClickOutsideHandler(
		closeOnOutsideClick ?? true,
		dialogElRef,
		isOpen,
		close,
	);

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<dialog {...rest} ref={dialogElRef} />,
		container || window.document.body,
	);
};
