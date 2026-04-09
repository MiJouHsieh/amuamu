import IconClose from "src/assets/icons/icon-close.svg?react";
import { useEffect, useState, useRef, useCallback } from "react";

const CLOSE_ANIMATION_MS = 700; // 要跟 CSS transition duration 對應

export function MessageModal({
  onClose,
  children,
  autoClose = false,
  autoCloseDelay = 3500,
  className = "",
}) {
  const [styleState, setStyleState] = useState("messageModalHidden");
  const closeTimeoutRef = useRef(null);

  const handleClose = useCallback(() => {
    setStyleState("messageModalHidden");
    clearTimeout(closeTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, CLOSE_ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    const enterTimeout = setTimeout(() => setStyleState("messageModalEnter"), 50);
    const stayTimeout = setTimeout(() => setStyleState("messageModalStay"), 100);

    let exitTimeout;

    if (autoClose) {
      exitTimeout = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
    }

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(stayTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(closeTimeoutRef.current);
    };
  }, [autoClose, autoCloseDelay, handleClose]);

  return (
    <div className={`messageModal ${styleState} ${className}`}>
      <div className="flex flex-col justify-center space-y-3 borderYellow">
        <div className="flex justify-end p-1 border-b border-beige/50">
          <IconClose
            onClick={handleClose}
            className="h-[21px] w-6 cursor-pointer text-yellow400 hover:text-orange"
          />
        </div>
        <div className="w-full space-y-2 text-center">{children}</div>
      </div>
    </div>
  );
}
