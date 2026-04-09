import IconClose from "src/assets/icons/icon-close.svg?react";
import { useEffect, useState } from "react";

export function MessageModal({
  onClose,
  children,
  autoClose = false,
  autoCloseDelay = 3500,
  className = "",
}) {
  const [styleState, setStyleState] = useState("messageModalHidden");

  useEffect(() => {
    const enterTimeout = setTimeout(() => setStyleState("messageModalEnter"), 50);
    const stayTimeout = setTimeout(() => setStyleState("messageModalStay"), 100);

    let exitTimeout;
    let closeTimeout;

    if (autoClose) {
      exitTimeout = setTimeout(() => {
        setStyleState("messageModalHidden");
        closeTimeout = setTimeout(() => {
          onClose();
        }, 700); // 要跟 CSS transition duration 對應
      }, autoCloseDelay);
    }

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(stayTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(closeTimeout);
    };

  }, [autoClose, autoCloseDelay, onClose]);

  return (
    <div className={`messageModal ${styleState} ${className}`}>
      <div className="flex flex-col justify-center space-y-3 borderYellow">
        <div className="flex justify-end p-1 border-b border-beige/50">
          <IconClose
            onClick={onClose}
            className="h-[21px] w-6 cursor-pointer text-yellow400 hover:text-orange"
          />
        </div>
        <div className="w-full space-y-2 text-center">{children}</div>
      </div>
    </div>
  );
}
