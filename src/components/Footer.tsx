import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 md:grid-cols-4">
        <div>
          <div className="font-serif text-2xl">FASCO</div>
          <p className="mt-3 max-w-xs text-mute">Editorial fashion for everyday icons. Designed to be worn, remembered, and collected.</p>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Shop</h4>
          <div className="flex flex-col gap-2 text-mute">
            <Link to="/shop">All Products</Link>
            <Link to="/shop?category=Women%27s%20Fashion">Women</Link>
            <Link to="/shop?category=Men%27s%20Fashion">Men</Link>
            <Link to="/shop?sort=sale">Sale</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Help</h4>
          <div className="flex flex-col gap-2 text-mute">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/signin">My Account</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-medium">Get in touch</h4>
          <p className="text-mute">hello@fasco.store</p>
          <p className="mt-1 text-mute">Mon–Sat · 9:00–20:00</p>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-mute">
        Copyright © {new Date().getFullYear()} FASCO. All rights reserved.
      </div>
    </footer>
  );
}
