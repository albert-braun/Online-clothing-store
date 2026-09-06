import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../data";
import { colorHex } from "../data";
import { money } from "../lib/cn";
import { useShop } from "../store";

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const { wishlist, toggleWish } = useShop();
  const loved = wishlist.includes(product.id);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-wash">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${compact ? "h-56" : "h-72 md:h-80"}`}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded bg-black px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </Link>
      <button
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm"
        onClick={() => toggleWish(product.id)}
        aria-label="Wishlist"
      >
        <Heart className={`h-4 w-4 ${loved ? "fill-sale text-sale" : ""}`} />
      </button>
      <div className="pt-3">
        <div className="mb-1 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < product.rating ? "fill-star text-star" : "text-line"}`} />
          ))}
        </div>
        <Link to={`/product/${product.id}`} className="block text-[15px] font-medium">
          {product.title}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-medium">{money(product.price)}</span>
          {product.oldPrice && <span className="text-mute line-through">{money(product.oldPrice)}</span>}
        </div>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-black/15"
              style={{ background: colorHex[c] }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
