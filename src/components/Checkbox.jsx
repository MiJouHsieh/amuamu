import IconCheck from "src/assets/icons/icon-check.svg?react";

export function Checkbox({ className, items }) {
  return (
    <div className={`${className} flex items-center`}>
      <input
        type="checkbox"
        id="custom-checkbox"
        className="checkboxIconStyle peer relative shrink-0 appearance-none rounded-full border-beige300 bg-teal300 checked:border-transparent"
      />

      <label
        htmlFor="custom-checkbox"
        className="checkbox-input body-s peer-checked mx-4 flex w-full cursor-pointer items-center text-xl peer-checked:line-through peer-checked:decoration-pink200 peer-checked:decoration-solid"
      >
        {items}
      </label>
      <IconCheck className="checkboxIconStyle pointer-events-none absolute hidden rounded-full border-pink peer-checked:block" />
    </div>
  );
}
