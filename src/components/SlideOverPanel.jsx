import IconClose from "src/assets/icons/icon-close.svg?react";

export function SlideOverPanel({ ref , onClose, children }) {
  return (
    <div ref={ref} className="slideOverPanelStyle">
      <div className="flex flex-col justify-center gap-3">
        <div className="flex justify-end">
          <IconClose onClick={onClose} className="h-[21px] w-6 cursor-pointer border-blue-300" />
        </div>
        {children}
      </div>
    </div>
  );
}

