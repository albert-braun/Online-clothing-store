export type Color = "black" | "white" | "beige" | "blue" | "green" | "red";
export type Size = "XS" | "S" | "M" | "L" | "XL";
export type Category = "Men's Fashion" | "Women's Fashion" | "Women Accessories" | "Men Accessories" | "Discount Deals";

export type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: Category;
  tags: string[];
  colors: Color[];
  sizes: Size[];
  image: string;
  images: string[];
  badge?: "sale" | "new" | "hot";
  createdAt: number;
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const photos = {
  yellow: u("photo-1515886657613-9f3515b0c78f"),
  street: u("photo-1483985988355-763728e1935b"),
  coat: u("photo-1539109136881-3be8266af6d0"),
  denim: u("photo-1542272604-787c3835535d"),
  jacket: u("photo-1552374196-1ab2a1c593e8"),
  dress: u("photo-1490481651871-ab68de25d43d"),
  white: u("photo-1524504388940-b1c1722653e1"),
  knit: u("photo-1434389677669-e08b4cac3105"),
  suit: u("photo-1617137968427-85924c800a22"),
  peaky: u("photo-1509631179647-0177331693ae"),
  insta1: u("photo-1469334031218-e382a71b716b"),
  insta2: u("photo-1487222477894-8943e31ef7b2"),
  insta3: u("photo-1529139574466-a303027c1d8b"),
  insta4: u("photo-1529626455594-4ff0802cfb7e"),
  insta5: u("photo-1517841905240-472988babdf9"),
  heroL: u("photo-1524504388940-b1c1722653e1", 800),
  heroR: u("photo-1509631179647-0177331693ae", 800),
  heroM: u("photo-1483985988355-763728e1935b", 900),
  signin: u("photo-1524504388940-b1c1722653e1", 1200),
  signup: u("photo-1529139574466-a303027c1d8b", 1200),
  newsL: u("photo-1469334031218-e382a71b716b", 700),
  newsR: u("photo-1515886657613-9f3515b0c78f", 700),
};

export const images = photos;

export const products: Product[] = [
  {
    id: "shimmer-mini",
    title: "Shimmer Mini Dress",
    price: 120,
    oldPrice: 160,
    rating: 5,
    reviews: 42,
    category: "Women's Fashion",
    tags: ["Dress", "Party", "New"],
    colors: ["beige", "black", "red"],
    sizes: ["XS", "S", "M", "L"],
    image: photos.yellow,
    images: [photos.yellow, photos.dress, photos.white],
    badge: "sale",
    createdAt: 8,
  },
  {
    id: "denim-jacket",
    title: "Denim Jacket",
    price: 45,
    oldPrice: 72,
    rating: 5,
    reviews: 31,
    category: "Men's Fashion",
    tags: ["Jacket", "Denim", "Sale"],
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    image: photos.denim,
    images: [photos.denim, photos.jacket, photos.coat],
    badge: "sale",
    createdAt: 12,
  },
  {
    id: "ruffle-mini",
    title: "Mini Dress With Ruffled Straps",
    price: 540.23,
    rating: 4,
    reviews: 18,
    category: "Women's Fashion",
    tags: ["Dress", "Summer"],
    colors: ["white", "beige", "black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: photos.white,
    images: [photos.white, photos.yellow, photos.dress],
    badge: "new",
    createdAt: 20,
  },
  {
    id: "urban-coat",
    title: "Urban Oversized Coat",
    price: 210,
    rating: 5,
    reviews: 27,
    category: "Women's Fashion",
    tags: ["Coat", "Winter"],
    colors: ["black", "beige"],
    sizes: ["S", "M", "L"],
    image: photos.coat,
    images: [photos.coat, photos.street, photos.knit],
    createdAt: 6,
  },
  {
    id: "peaky-set",
    title: "Peaky Blinders Set",
    price: 100,
    rating: 5,
    reviews: 64,
    category: "Men's Fashion",
    tags: ["Set", "Classic"],
    colors: ["black", "beige"],
    sizes: ["S", "M", "L", "XL"],
    image: photos.peaky,
    images: [photos.peaky, photos.suit, photos.jacket],
    badge: "hot",
    createdAt: 15,
  },
  {
    id: "knit-turtleneck",
    title: "Ribbed Turtleneck Knit",
    price: 68,
    rating: 4,
    reviews: 22,
    category: "Women's Fashion",
    tags: ["Knit", "Basics"],
    colors: ["black", "white", "beige"],
    sizes: ["XS", "S", "M", "L"],
    image: photos.knit,
    images: [photos.knit, photos.white, photos.coat],
    createdAt: 4,
  },
  {
    id: "tailored-suit",
    title: "Tailored Wool Suit",
    price: 340,
    rating: 5,
    reviews: 11,
    category: "Men's Fashion",
    tags: ["Suit", "Formal"],
    colors: ["black", "blue"],
    sizes: ["S", "M", "L", "XL"],
    image: photos.suit,
    images: [photos.suit, photos.jacket, photos.peaky],
    createdAt: 9,
  },
  {
    id: "street-look",
    title: "City Street Look",
    price: 95,
    oldPrice: 130,
    rating: 4,
    reviews: 19,
    category: "Women's Fashion",
    tags: ["Look", "Casual"],
    colors: ["black", "white"],
    sizes: ["S", "M", "L"],
    image: photos.street,
    images: [photos.street, photos.insta1, photos.coat],
    badge: "sale",
    createdAt: 18,
  },
  {
    id: "leather-bag",
    title: "Structured Leather Bag",
    price: 88,
    rating: 5,
    reviews: 40,
    category: "Women Accessories",
    tags: ["Bag", "Accessories"],
    colors: ["black", "beige"],
    sizes: ["S", "M"],
    image: photos.insta5,
    images: [photos.insta5, photos.white, photos.street],
    createdAt: 11,
  },
  {
    id: "cap-classic",
    title: "Classic Wool Cap",
    price: 32,
    rating: 4,
    reviews: 16,
    category: "Men Accessories",
    tags: ["Cap", "Accessories"],
    colors: ["black", "beige", "green"],
    sizes: ["S", "M", "L"],
    image: photos.jacket,
    images: [photos.jacket, photos.peaky, photos.suit],
    createdAt: 3,
  },
  {
    id: "linen-shirt",
    title: "Relaxed Linen Shirt",
    price: 54,
    rating: 4,
    reviews: 25,
    category: "Men's Fashion",
    tags: ["Shirt", "Summer"],
    colors: ["white", "beige", "blue"],
    sizes: ["S", "M", "L", "XL"],
    image: photos.jacket,
    images: [photos.white, photos.suit, photos.denim],
    createdAt: 7,
  },
  {
    id: "deal-blouse",
    title: "Silk Tie-Neck Blouse",
    price: 76,
    oldPrice: 110,
    rating: 5,
    reviews: 33,
    category: "Discount Deals",
    tags: ["Blouse", "Sale"],
    colors: ["white", "red", "black"],
    sizes: ["XS", "S", "M", "L"],
    image: photos.dress,
    images: [photos.dress, photos.yellow, photos.white],
    badge: "sale",
    createdAt: 16,
  },
];

export const instagram = [photos.insta1, photos.insta2, photos.insta3, photos.insta4, photos.insta5];

export const brands = ["CHANEL", "LOUIS VUITTON", "PRADA", "CALVIN KLEIN", "DENIM"];

export const testimonials = [
  {
    name: "James K.",
    role: "Traveler",
    text: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
    avatar: photos.jacket,
  },
  {
    name: "Mila S.",
    role: "Stylist",
    text: "The quality is incredible and the pieces feel editorial. Shipping was fast and packaging was beautiful.",
    rating: 5,
    avatar: photos.white,
  },
  {
    name: "Noah P.",
    role: "Photographer",
    text: "Clean cuts, great fabrics, and the fit is exactly as described. FASCO became my default store.",
    rating: 4,
    avatar: photos.suit,
  },
];

export const categories: Category[] = [
  "Men's Fashion",
  "Women's Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

export const allSizes: Size[] = ["XS", "S", "M", "L", "XL"];
export const allColors: Color[] = ["black", "white", "beige", "blue", "green", "red"];
export const allTags = ["Dress", "Jacket", "Denim", "Coat", "Knit", "Suit", "Bag", "Sale", "New", "Summer"];

export function getProduct(id?: string) {
  return products.find((p) => p.id === id) ?? products[1];
}

export const colorHex: Record<Color, string> = {
  black: "#111111",
  white: "#ffffff",
  beige: "#e8d5c4",
  blue: "#3b6ea5",
  green: "#3c6e4a",
  red: "#c44536",
};
