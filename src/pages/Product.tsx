import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GitCompare, Heart, Share2, Star, Truck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { colorHex, getProduct, products, type Color, type Size } from "../data";
import { money } from "../lib/cn";
import { useShop } from "../store";
import { ProductCard } from "../components/ProductCard";
import { Countdown } from "../components/Countdown";
import { PeakyBanner } from "../components/Marketing";
import { Reveal } from "../components/Reveal";

export function Product() {
  const { id } = useParams();
  const product = getProduct(id);
  const nav = useNavigate();
  const { addToCart, toggleWish, toggleCompare, wishlist, compare } = useShop();
  const [color, setColor] = useState<Color>(product.colors[0]);
  const [size, setSize] = useState<Size>(product.sizes[2] ?? product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(product.image);

  useEffect(() => {
    setColor(product.colors[0]);
    setSize(product.sizes[2] ?? product.sizes[0]);
    setQty(1);
    setActive(product.image);
  }, [product]);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8">
      <p className="text-sm text-mute">
        <Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › {product.title}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[88px_1fr_1fr]">
        <div className="hidden flex-col gap-3 lg:flex">
          {product.images.map((src) => (
            <button key={src} onClick={() => setActive(src)} className={`overflow-hidden border ${active === src ? "border-black" : "border-transparent"}`}>
              <img src={src} alt="" className="h-24 w-full object-cover" />
            </button>
          ))}
        </div>
        <img src={active} alt={product.title} className="h-[520px] w-full object-cover bg-wash" />
        <div>
          <h1 className="font-serif text-4xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-star text-star" : "text-line"}`} />
            ))}
            <span className="text-sm text-mute">({product.reviews} reviews)</span>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl">{money(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-mute line-through">{money(product.oldPrice)}</span>
                <span className="bg-sale px-2 py-0.5 text-xs text-white">SALE</span>
              </>
            )}
          </div>
          <div className="mt-6">
            <div className="mb-2 text-sm">Size: {size}</div>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-10 min-w-10 border px-3 ${size === s ? "border-black bg-black text-white" : "border-line"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm">Color: {color}</div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-7 w-7 rounded-full border ${color === c ? "ring-2 ring-black ring-offset-2" : "border-black/20"}`}
                  style={{ background: colorHex[c] }}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <div className="flex h-12 border border-line">
              <button className="w-10" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="grid w-10 place-items-center">{qty}</span>
              <button className="w-10" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              className="h-12 flex-1 bg-black text-white"
              onClick={() => {
                addToCart(product, qty, color, size);
                nav("/cart");
              }}
            >
              Add to cart
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <button className="flex items-center gap-1" onClick={() => toggleCompare(product.id)}>
              <GitCompare className="h-4 w-4" /> {compare.includes(product.id) ? "In compare" : "Compare"}
            </button>
            <button className="flex items-center gap-1" onClick={() => toggleWish(product.id)}>
              <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-sale text-sale" : ""}`} /> Wishlist
            </button>
            <button className="flex items-center gap-1">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-mute">
            <Truck className="h-4 w-4" /> Free shipping on orders over $120 · Easy 30-day returns
          </p>
        </div>
      </div>
      <PeakyBanner />
      <Reveal>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl">People Also Loved</h2>
            <Countdown />
          </div>
        </div>
        <Swiper modules={[Navigation]} slidesPerView={1.2} spaceBetween={16} breakpoints={{ 768: { slidesPerView: 3 }, 1100: { slidesPerView: 4 } }}>
          {products.filter((p) => p.id !== product.id).slice(0, 8).map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} compact />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
    </div>
  );
}
