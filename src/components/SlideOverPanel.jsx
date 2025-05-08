import IconClose from "src/assets/icons/icon-close.svg?react";

export function SlideOverPanel({ ref, onClose, children }) {
  return (
    <div ref={ref} className="slideOverPanelStyle">
      <div className="flex flex-col justify-center gap-3 md:gap-6">
        <div className="flex justify-end py-4">
          <IconClose
            onClick={onClose}
            className="h-[21px] w-6 cursor-pointer text-yellow400 hover:text-orange"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
