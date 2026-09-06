import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cartCount, useShop } from "../store";
import { SearchModal } from "./SearchModal";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: true },
  { to: "/shop?sort=newest", label: "Products", end: false },
  { to: "/about", label: "Pages" },
];

export function Header() {
  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const user = useShop((s) => s.user);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const count = cartCount(cart);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5">
          <Link to="/" className="font-serif text-[28px] tracking-tight">
            FASCO
          </Link>
          <nav className="hidden items-center gap-8 text-[15px] md:flex">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={Boolean(l.end)}
                className={({ isActive }) => (isActive ? "underline underline-offset-8" : "hover:opacity-70")}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setSearch(true)} aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link to={user ? "/account" : "/signin"} aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black text-[9px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black text-[9px] text-white">
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMenu((v) => !v)} aria-label="Menu">
              {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setMenu(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </>
  );
}
