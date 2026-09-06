import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { money } from "../lib/cn";
import { cartSubtotal, useShop } from "../store";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  country: z.string().min(2),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(4),
  city: z.string().min(2),
  postal: z.string().min(3),
  cardNumber: z.string().min(12),
  exp: z.string().min(4),
  cvc: z.string().min(3),
  cardName: z.string().min(2),
});

type Form = z.infer<typeof schema>;

export function Checkout() {
  const { cart, clearCart } = useShop();
  const sub = cartSubtotal(cart);
  const [code, setCode] = useState("");
  const [off, setOff] = useState(0);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  if (!cart.length) {
    return (
      <div className="py-20 text-center">
        <p>Add something to checkout.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8">
      <h1 className="font-serif text-4xl">FASCO Demo Checkout</h1>
      <form
        className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        onSubmit={handleSubmit(() => {
          clearCart();
          nav("/");
        })}
      >
        <div>
          <h2 className="text-xl font-medium">Contact</h2>
          <input className="mt-3 h-12 w-full border border-line px-3" placeholder="Email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-sale">{errors.email.message}</p>}
          <h2 className="mt-8 text-xl font-medium">Delivery</h2>
          <input className="mt-3 h-12 w-full border border-line px-3" placeholder="Country / Region" {...register("country")} />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="h-12 border border-line px-3" placeholder="First name" {...register("firstName")} />
            <input className="h-12 border border-line px-3" placeholder="Last name" {...register("lastName")} />
          </div>
          <input className="mt-3 h-12 w-full border border-line px-3" placeholder="Address" {...register("address")} />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="h-12 border border-line px-3" placeholder="City" {...register("city")} />
            <input className="h-12 border border-line px-3" placeholder="Postal code" {...register("postal")} />
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" /> Save this information for next time
          </label>
          <h2 className="mt-8 text-xl font-medium">Payment</h2>
          <input className="mt-3 h-12 w-full border border-line px-3" placeholder="Card number" {...register("cardNumber")} />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="h-12 border border-line px-3" placeholder="Expiration" {...register("exp")} />
            <input className="h-12 border border-line px-3" placeholder="Security code" {...register("cvc")} />
          </div>
          <input className="mt-3 h-12 w-full border border-line px-3" placeholder="Cardholder name" {...register("cardName")} />
          <button className="mt-6 h-12 w-full bg-black text-white">Pay Now</button>
        </div>
        <aside className="h-fit border border-line p-6">
          {cart.map((l) => (
            <div key={l.id} className="mb-4 flex gap-3">
              <img src={l.product.image} alt="" className="h-16 w-14 object-cover" />
              <div className="flex-1">
                <div className="text-sm">{l.product.title}</div>
                <div className="text-xs text-mute">{l.size} · {l.color} × {l.qty}</div>
              </div>
              <div className="text-sm">{money(l.product.price * l.qty)}</div>
            </div>
          ))}
          <div className="mt-4 flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Discount code" className="h-11 flex-1 border border-line px-3" />
            <button
              type="button"
              className="h-11 px-4 border border-black"
              onClick={() => setOff(code.toLowerCase() === "fasco20" ? sub * 0.2 : 0)}
            >
              Apply
            </button>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{money(sub)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            {!!off && <div className="flex justify-between text-sale"><span>Discount</span><span>−{money(off)}</span></div>}
            <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
              <span>Total</span><span>{money(sub - off)}</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
