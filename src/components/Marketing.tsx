import { Link } from "react-router-dom";
import { images, instagram, products } from "../data";
import { Reveal } from "./Reveal";

export function Newsletter() {
  return (
    <Reveal>
      <section className="relative mx-auto my-16 grid max-w-[1240px] overflow-hidden bg-wash md:grid-cols-[1fr_1.2fr_1fr]">
        <img src={images.newsL} alt="" className="hidden h-full max-h-72 w-full object-cover md:block" />
        <SubscribeBox />
        <img src={images.newsR} alt="" className="hidden h-full max-h-72 w-full object-cover md:block" />
      </section>
    </Reveal>
  );
}

function SubscribeBox() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <h2 className="font-serif text-3xl md:text-4xl">Subscribe To Our Newsletter</h2>
      <p className="mt-3 max-w-md text-mute">
        Stay ahead of the drop. New arrivals, private sales and editorial looks � once a week.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex w-full max-w-md border border-black"
      >
        <input required type="email" placeholder="Email address" className="h-12 flex-1 bg-transparent px-4 outline-none" />
        <button className="h-12 bg-black px-5 text-sm text-white">Subscribe Now</button>
      </form>
    </div>
  );
}

export function InstagramStrip() {
  return (
    <Reveal>
      <section className="mx-auto max-w-[1240px] px-5 py-16">
        <h2 className="mb-8 text-center font-serif text-3xl md:text-4xl">Follow Us On Instagram</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {instagram.map((src) => (
            <img key={src} src={src} alt="" className="h-44 w-full object-cover md:h-52" />
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export function PeakyBanner() {
  const item = products[4];
  return (
    <Reveal>
      <section className="mx-auto my-10 grid max-w-[1240px] overflow-hidden bg-black text-white md:grid-cols-2">
        <img src={images.peaky} alt="Peaky Blinders" className="h-72 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center px-8 py-10 md:px-14">
          <p className="text-xs tracking-[0.3em] text-white/70">LIMITED COLLECTION</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Peaky Blinders</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Sharp tailoring, muted palettes and the attitude of a classic British drama. Own the look.
          </p>
          <p className="mt-6 text-2xl font-medium">$ {item.price}</p>
          <Link to={`/product/${item.id}`} className="mt-5 inline-flex h-11 w-fit items-center bg-white px-6 text-sm text-black">
            Buy Now
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
