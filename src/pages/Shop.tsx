import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { allColors, allSizes, allTags, categories, colorHex, products, type Category, type Color, type Size } from "../data";
import { ProductCard } from "../components/ProductCard";
import { InstagramStrip, PeakyBanner } from "../components/Marketing";
import { Reveal } from "../components/Reveal";

type Sort = "featured" | "newest" | "price-asc" | "price-desc" | "rating" | "sale";

export function Shop() {
  const [params, setParams] = useSearchParams();
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const sort = (params.get("sort") as Sort) || "featured";
  const category = (params.get("category") as Category) || "";

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    if (tags.length) list = list.filter((p) => p.tags.some((t) => tags.includes(t)));
    if (sort === "newest") list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "sale") list = list.filter((p) => p.oldPrice).sort((a, b) => a.price - b.price);
    return list;
  }, [category, sizes, colors, tags, sort]);

  const perPage = 9;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  function toggle<T>(list: T[], value: T, set: (v: T[]) => void) {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8">
      <p className="text-sm text-mute">Home › Fashion</p>
      <h1 className="mt-2 font-serif text-4xl">Fashion</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside>
          <h3 className="mb-4 text-lg font-medium">Filters</h3>
          <Filter title="Size">
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(sizes, s, setSizes)}
                  className={`h-9 min-w-9 border px-2 text-sm ${sizes.includes(s) ? "border-black bg-black text-white" : "border-line"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Filter>
          <Filter title="Colors">
            <div className="flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(colors, c, setColors)}
                  className={`h-6 w-6 rounded-full border ${colors.includes(c) ? "ring-2 ring-black ring-offset-2" : "border-black/20"}`}
                  style={{ background: colorHex[c] }}
                  aria-label={c}
                />
              ))}
            </div>
          </Filter>
          <Filter title="Categories">
            <div className="flex flex-col gap-2 text-sm">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`text-left ${category === c ? "font-medium" : "text-mute"}`}
                  onClick={() => {
                    setParams(c === category ? {} : { category: c, sort });
                    setPage(1);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Filter>
          <Filter title="Tags">
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggle(tags, t, setTags)}
                  className={`border px-2 py-1 text-xs ${tags.includes(t) ? "border-black bg-black text-white" : "border-line"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Filter>
        </aside>
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-mute">{filtered.length} products</p>
            <select
              value={sort}
              onChange={(e) => {
                const next = new URLSearchParams(params);
                next.set("sort", e.target.value);
                setParams(next);
                setPage(1);
              }}
              className="h-10 border border-line px-3"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top rated</option>
              <option value="sale">On sale</option>
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {slice.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {!slice.length && <p className="py-16 text-center text-mute">No pieces match these filters.</p>}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-2.5 w-2.5 rounded-full ${page === i + 1 ? "bg-black" : "bg-line"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <PeakyBanner />
      <InstagramStrip />
    </div>
  );
}

function Filter({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <div className="mb-6 border-b border-line pb-5">
        <h4 className="mb-3 font-medium">{title}</h4>
        {children}
      </div>
    </Reveal>
  );
}
