import IconClose from "src/assets/icons/icon-close.svg?react";
import { useEffect, useState } from "react";

export function MiniCartModal({ onClose, children }) {
  const [styleState, setStyleState] = useState("miniCartModalHidden");

  useEffect(() => {
    setTimeout(() => setStyleState("miniCartModalEnter"), 50);
    const stayTimeout = setTimeout(() => setStyleState("miniCartModalStay"), 100);
    const exitTimeout = setTimeout(() => {
      setStyleState("miniCartModalHidden");
      onClose();
    }, 3500);

    return () => {
      clearTimeout(stayTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  return (
    <div className={`miniCartModal ${styleState}`}>
      <div className="borderYellow flex flex-col justify-center space-y-3">
        <div className="flex justify-end border-b border-beige/50 p-1">
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
