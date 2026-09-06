import { Link } from "react-router-dom";
import { products } from "../data";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../store";

export function Wishlist() {
  const ids = useShop((s) => s.wishlist);
  const list = products.filter((p) => ids.includes(p.id));
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-10">
      <h1 className="font-serif text-4xl">Wishlist</h1>
      {!list.length && (
        <p className="mt-6 text-mute">
          Nothing saved yet. <Link to="/shop" className="underline">Browse the shop</Link>
        </p>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-serif text-5xl">About FASCO</h1>
      <p className="mt-6 text-lg leading-8 text-mute">
        FASCO is an editorial fashion house inspired by archival tailoring and street energy. We design pieces that look like a still from a film — then hold up on a Monday morning.
      </p>
    </div>
  );
}

export function Contact() {
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-serif text-5xl">Contact</h1>
      <form className="mt-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input className="h-12 w-full border border-line px-3" placeholder="Name" />
        <input className="h-12 w-full border border-line px-3" placeholder="Email" />
        <textarea className="h-32 w-full border border-line p-3" placeholder="Message" />
        <button className="h-12 w-full bg-black text-white">Send</button>
      </form>
    </div>
  );
}

export function Faq() {
  const items = [
    ["Shipping", "Free worldwide shipping over $120. Standard delivery 4–7 days."],
    ["Returns", "30-day returns on unworn pieces with tags attached."],
    ["Sizing", "Most pieces are true to size. Check the size chart on each product."],
  ];
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-5xl">FAQ</h1>
      <div className="mt-8 divide-y divide-line">
        {items.map(([q, a]) => (
          <details key={q} className="py-4">
            <summary className="cursor-pointer text-lg font-medium">{q}</summary>
            <p className="mt-2 text-mute">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function Account() {
  const user = useShop((s) => s.user);
  const setUser = useShop((s) => s.setUser);
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-serif text-4xl">My Account</h1>
      {user ? (
        <>
          <p className="mt-4">{user.firstName} {user.lastName}</p>
          <p className="text-mute">{user.email}</p>
          <button className="mt-6 h-11 border border-black px-5" onClick={() => setUser(null)}>Log out</button>
        </>
      ) : (
        <p className="mt-4"><Link to="/signin" className="underline">Sign in</Link> to see your orders.</p>
      )}
    </div>
  );
}
