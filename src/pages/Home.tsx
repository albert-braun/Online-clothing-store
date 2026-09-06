import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { brands, categories, images, products, testimonials } from "../data";
import { ProductCard } from "../components/ProductCard";
import { Countdown } from "../components/Countdown";
import { InstagramStrip, PeakyBanner } from "../components/Marketing";
import { Reveal } from "../components/Reveal";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";

export function Home() {
  const [cat, setCat] = useState("Women's Fashion");
  const arrivals = useMemo(() => {
    const list = products.filter((p) => p.category === cat);
    return (list.length ? list : products).slice(0, 6);
  }, [cat]);

  return (
    <div>
      <section className="grid min-h-[70vh] grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr]">
        <img src={images.heroL} alt="" className="hidden h-[70vh] w-full object-cover md:block" />
        <div className="relative flex min-h-[70vh] items-center justify-center">
          <img src={images.heroM} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 px-6 text-center text-white">
            <p className="text-sm tracking-[0.35em]">NEW COLLECTION</p>
            <h1 className="mt-2 font-serif text-6xl leading-none md:text-7xl">
              ULTIMATE
              <br />
              SALE
            </h1>
            <p className="mt-4 text-sm tracking-widest">NEW COLLECTION</p>
            <Link to="/shop" className="mt-8 inline-flex h-12 items-center bg-white px-8 text-sm text-black">
              SHOP NOW
            </Link>
          </div>
        </div>
        <img src={images.heroR} alt="" className="hidden h-[70vh] w-full object-cover md:block" />
      </section>

      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-5 py-10 text-lg font-medium tracking-wide text-mute md:text-2xl">
          {brands.map((b) => (
            <span key={b} className="font-serif text-black/80">
              {b}
            </span>
          ))}
        </div>
      </Reveal>

      <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-10 md:grid-cols-[0.9fr_1.4fr]">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl">Deals Of The Month</h2>
          <p className="mt-4 max-w-md text-mute">
            A curated edit of the season’s strongest pieces — limited quantities, extra 20% off until the timer hits zero.
          </p>
          <Link to="/shop?sort=sale" className="mt-6 inline-flex h-11 items-center bg-black px-6 text-sm text-white">
            Buy Now
          </Link>
          <h3 className="mt-8 text-sm font-medium">Hurry, Before It’s Too Late!</h3>
          <Countdown />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={18}
              slidesPerView={1.15}
              breakpoints={{ 768: { slidesPerView: 2.2 }, 1100: { slidesPerView: 3 } }}
              navigation={{ prevEl: ".deals-prev", nextEl: ".deals-next" }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
            >
              {products.slice(0, 6).map((p) => (
                <SwiperSlide key={p.id}>
                  <ProductCard product={p} compact />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4 flex justify-end gap-2">
              <button className="deals-prev grid h-10 w-10 place-items-center rounded-full border border-line">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button className="deals-next grid h-10 w-10 place-items-center rounded-full border border-line">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-12">
        <Reveal>
          <h2 className="text-center font-serif text-4xl">New Arrivals</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`h-10 px-4 text-sm ${cat === c ? "bg-black text-white" : "bg-wash"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {arrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <PeakyBanner />
      <InstagramStrip />

      <section className="mx-auto max-w-[900px] px-5 pb-16">
        <Reveal>
          <h2 className="mb-8 text-center font-serif text-4xl">This Is What Our Customers Say</h2>
        </Reveal>
        <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 4200 }} spaceBetween={20}>
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="mx-auto max-w-xl rounded-xl border border-line p-8 text-center">
                <img src={t.avatar} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
                <p className="mt-4 text-lg leading-relaxed">“{t.text}”</p>
                <div className="mt-3 flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-star text-star" : "text-line"}`} />
                  ))}
                </div>
                <div className="mt-3 font-medium">{t.name}</div>
                <div className="text-xs text-mute">{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
