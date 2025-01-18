import { useState } from "react";

export const useModalContainer = (
	initialState: boolean | (() => boolean) = false,
) => {
	const [isOpen, setIsOpen] = useState(initialState);
	return {
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
		isOpen,
	} as const;
};
