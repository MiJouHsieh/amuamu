import { useCart } from "src/context/CartContext";
import IconCheck from "src/assets/icons/icon-check.svg?react";

export function CheckCartItem({ className, item, id }) {
  return (
    <div className={`${className} flex items-center`}>
      <input
        type="checkbox"
        id={`custom-checkbox-${id}`}
        className="checkboxIconStyle peer relative shrink-0 appearance-none rounded-full border-yellow200 bg-blue800 checked:border-transparent"
      />

      <label
        htmlFor={`custom-checkbox-${id}`}
        className="checkbox-input peer-checked mx-4 flex w-full cursor-pointer items-center text-xl peer-checked:line-through peer-checked:decoration-orange peer-checked:decoration-solid"
      >
        {item}
      </label>

      <IconCheck className="checkboxIconStyle pointer-events-none absolute hidden rounded-full border-orange peer-checked:block" />
    </div>
  );
}

export function CartPage() {
  const { cart } = useCart();
  return (
    <section className="flex w-full justify-center rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          Cart List
        </h1>

        {/* list */}
        <div className="w-full space-y-4 rounded-xl border border-yellow p-6 text-beige md:flex md:flex-wrap md:space-y-0">
          {cart ? (
            cart?.map((item) => {
              return <CheckCartItem className="md:p-2" item={item} key={item} id={item} />;
            })
          ) : (
            <h4 className="text-beige">your cart is empty</h4>
          )}
        </div>
      </div>
    </section>
  );
}
