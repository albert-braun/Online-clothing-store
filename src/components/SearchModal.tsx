import { FormEvent, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { products } from "../data";
import { money } from "../lib/cn";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const fuse = useMemo(() => new Fuse(products, { keys: ["title", "category", "tags"], threshold: 0.35 }), []);
  const results = q.trim() ? fuse.search(q).map((r) => r.item) : products.slice(0, 6);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-black/40 p-4" onClick={onClose}>
      <div
        className="mx-auto mt-16 max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e: FormEvent) => e.preventDefault()}
          className="border-b border-line"
        >
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dresses, jackets, sets..."
            className="h-14 w-full px-5 text-base outline-none"
          />
        </form>
        <div className="max-h-80 overflow-auto">
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 hover:bg-wash"
            >
              <img src={p.image} alt="" className="h-14 w-12 object-cover" />
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-mute">{p.category} · {money(p.price)}</div>
              </div>
            </Link>
          ))}
          {!results.length && <p className="px-5 py-8 text-center text-mute">Nothing matched that search.</p>}
        </div>
      </div>
    </div>
  );
}
