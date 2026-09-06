import { Link } from "react-router-dom";
import { money } from "../lib/cn";
import { cartSubtotal, useShop } from "../store";

export function Cart() {
  const { cart, setQty, remove } = useShop();
  const sub = cartSubtotal(cart);
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8">
      <p className="text-sm text-mute">Home › Cart</p>
      <h1 className="mt-2 font-serif text-4xl">Shopping Cart</h1>
      {!cart.length && (
        <div className="py-16 text-center">
          <p className="text-mute">Your bag is empty.</p>
          <Link to="/shop" className="mt-4 inline-flex h-11 items-center bg-black px-6 text-white">
            Continue shopping
          </Link>
        </div>
      )}
      {!!cart.length && (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="overflow-x-auto">
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] border-b border-line pb-3 text-sm text-mute md:grid">
              <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span>
            </div>
            {cart.map((line) => (
              <div key={line.id} className="grid items-center gap-4 border-b border-line py-5 md:grid-cols-[2fr_1fr_1fr_1fr]">
                <div className="flex gap-4">
                  <img src={line.product.image} alt="" className="h-24 w-20 object-cover" />
                  <div>
                    <div className="font-medium">{line.product.title}</div>
                    <div className="text-sm text-mute">Color: {line.color} · Size: {line.size}</div>
                    <button className="mt-2 text-sm underline" onClick={() => remove(line.id)}>Remove</button>
                  </div>
                </div>
                <div>{money(line.product.price)}</div>
                <div className="flex h-10 w-28 border border-line">
                  <button className="flex-1" onClick={() => setQty(line.id, line.qty - 1)}>−</button>
                  <span className="grid flex-1 place-items-center">{line.qty}</span>
                  <button className="flex-1" onClick={() => setQty(line.id, line.qty + 1)}>+</button>
                </div>
                <div className="font-medium">{money(line.product.price * line.qty)}</div>
              </div>
            ))}
          </div>
          <aside className="h-fit border border-line p-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Wrap The Product
            </label>
            <div className="mt-6 flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{money(sub)}</span>
            </div>
            <Link to="/checkout" className="mt-5 flex h-12 items-center justify-center bg-black text-white">
              Checkout
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-sm underline">
              View Cart
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
