// Seed catalog for `npm run db:seed`. Images are from Unsplash.
import type { productColor } from "./schema";

export type SeedCategory = { slug: string; title: string; description: string };

export type SeedProduct = {
  id: string;
  name: string;
  description: string;
  /** Price in cents. */
  price: number;
  /** Unsplash photo id. */
  image: string;
  category: string;
  color: (typeof productColor.enumValues)[number];
  addedAt: string;
  badge?: string;
};

/** In display order. */
export const seedCategories: SeedCategory[] = [
  {
    slug: "women",
    title: "Women",
    description: "Dresses, outerwear and knits cut from natural fibres.",
  },
  {
    slug: "men",
    title: "Men",
    description: "Tailoring, shirting and everyday layers.",
  },
  {
    slug: "bags",
    title: "Bags",
    description: "Structured and soft leather bags, finished by hand.",
  },
  {
    slug: "shoes",
    title: "Shoes",
    description: "Heels, pumps and sneakers built on lasts made to last.",
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    description: "Gold, silver and stones, set in small workshops.",
  },
  {
    slug: "accessories",
    title: "Accessories",
    description: "Hats, eyewear and belts to finish a look.",
  },
];

/** Sample stock levels. Anything not listed has plenty. */
export const DEFAULT_STOCK = 12;
export const stockOverrides: Record<string, number> = {
  "p-007": 2,
  "p-010": 3,
  "p-014": 0,
  "p-019": 0,
  "p-023": 2,
  "p-032": 1,
  "p-033": 0,
};

export const seedProducts: SeedProduct[] = [
  // Bags
  { id: "p-001", name: "Structured top handle bag", description: "Smooth calf leather with a polished turn-lock closure.", price: 289000, image: "1584917865442-de89df76afd3", category: "bags", color: "red", addedAt: "2026-10-28", badge: "New" },
  { id: "p-004", name: "Woven rattan handbag", description: "Hand-woven rattan body with a leather flap.", price: 154000, image: "1590874103328-eac38a683ce7", category: "bags", color: "brown", addedAt: "2026-09-12" },
  { id: "p-007", name: "Lacquered chain shoulder bag", description: "Glossed leather panels on a fine chain strap.", price: 215000, image: "1566150905458-1bf1fc113f0d", category: "bags", color: "pink", addedAt: "2026-10-02", badge: "Limited" },
  { id: "p-009", name: "Teal leather satchel", description: "Grained leather with a brushed metal clasp.", price: 198000, image: "1594223274512-ad4803739b7c", category: "bags", color: "blue", addedAt: "2026-08-20" },
  { id: "p-010", name: "Croc-embossed mini bag", description: "Embossed leather on a slim top handle.", price: 176000, image: "1575032617751-6ddec2089882", category: "bags", color: "red", addedAt: "2026-10-30", badge: "New" },
  { id: "p-011", name: "Soft leather backpack", description: "Vegetable-tanned leather that darkens with wear.", price: 134000, image: "1622560480605-d83c853bc5c3", category: "bags", color: "brown", addedAt: "2026-07-14" },
  { id: "p-012", name: "Saddle crossbody bag", description: "Curved flap and an adjustable leather strap.", price: 118000, image: "1600857062241-98e5dba7f214", category: "bags", color: "brown", addedAt: "2026-09-30" },
  { id: "p-013", name: "Printed leather tote", description: "Botanical print on structured calf leather.", price: 242000, image: "1591561954557-26941169b49e", category: "bags", color: "multi", addedAt: "2026-06-18" },

  // Women
  { id: "p-003", name: "Fringed knit poncho", description: "Open-weave cotton knit with hand-finished fringe.", price: 98000, image: "1434389677669-e08b4cac3105", category: "women", color: "neutral", addedAt: "2026-10-21", badge: "New" },
  { id: "p-006", name: "Chambray cropped shirt", description: "Washed cotton chambray with a micro-dot print.", price: 64000, image: "1596755094514-f87e34085b2c", category: "women", color: "blue", addedAt: "2026-08-02" },
  { id: "p-014", name: "Silk faille gown", description: "Floor-length faille with a full, moving skirt.", price: 420000, image: "1595777457583-95e059d581b8", category: "women", color: "red", addedAt: "2026-10-12", badge: "Limited" },
  { id: "p-015", name: "Floral belted dress", description: "Printed cotton with a buckled waist.", price: 136000, image: "1572804013309-59a88b7e92f1", category: "women", color: "red", addedAt: "2026-07-03" },
  { id: "p-016", name: "Wrap maxi dress", description: "Fluid crepe with a deep wrap neckline.", price: 158000, image: "1539008835657-9e8e9680c956", category: "women", color: "blue", addedAt: "2026-09-08" },
  { id: "p-017", name: "Corduroy shirt dress", description: "Fine-wale cotton corduroy, knee length.", price: 112000, image: "1585487000160-6ebcfceb0d03", category: "women", color: "red", addedAt: "2026-10-25", badge: "New" },
  { id: "p-018", name: "Belted camel trench", description: "Double-faced wool with a tie belt.", price: 268000, image: "1539533018447-63fcce2678e3", category: "women", color: "neutral", addedAt: "2026-10-05" },
  { id: "p-019", name: "Shearling-collar jacket", description: "Suede jacket with a natural shearling collar.", price: 310000, image: "1608063615781-e2ef8c73d114", category: "women", color: "brown", addedAt: "2026-10-18" },
  { id: "p-020", name: "Cropped down puffer", description: "Recycled nylon shell, responsibly sourced down.", price: 184000, image: "1548624313-0396c75e4b1a", category: "women", color: "yellow", addedAt: "2026-09-22" },

  // Men
  { id: "p-002", name: "Satin bomber jacket", description: "Lightweight satin shell with ribbed trims.", price: 186000, image: "1591047139829-d91aecb6caea", category: "men", color: "brown", addedAt: "2026-10-26", badge: "New" },
  { id: "p-021", name: "Leather biker jacket", description: "Lambskin with asymmetric zip and belted hem.", price: 345000, image: "1551028719-00167b16eac5", category: "men", color: "black", addedAt: "2026-10-01" },
  { id: "p-022", name: "Navy two-piece suit", description: "Super 120s wool, half-canvassed jacket.", price: 298000, image: "1617137968427-85924c800a22", category: "men", color: "blue", addedAt: "2026-08-28" },
  { id: "p-023", name: "Windowpane three-piece suit", description: "Brushed wool check with a matching waistcoat.", price: 365000, image: "1594938298603-c8148c4dae35", category: "men", color: "blue", addedAt: "2026-09-15" },
  { id: "p-024", name: "Poplin dress shirt", description: "Two-ply cotton poplin, spread collar.", price: 42000, image: "1598033129183-c4f50c736f10", category: "men", color: "white", addedAt: "2026-07-21" },
  { id: "p-025", name: "Oxford shirt trio", description: "Three washed oxford shirts in seasonal tones.", price: 96000, image: "1602810318383-e386cc2a3ccf", category: "men", color: "multi", addedAt: "2026-06-30" },
  { id: "p-026", name: "Loopback sweatshirt", description: "Heavy organic cotton loopback, relaxed fit.", price: 38000, image: "1620799140408-edc6dcb6d633", category: "men", color: "white", addedAt: "2026-10-09" },
  { id: "p-027", name: "Raw selvedge jeans", description: "14oz Japanese selvedge denim, straight leg.", price: 34000, image: "1624378439575-d8705ad7ae80", category: "men", color: "blue", addedAt: "2026-08-11" },
  { id: "p-028", name: "Pima cotton V-neck", description: "Fine-gauge pima jersey with a clean neckline.", price: 16000, image: "1620799139507-2a76f79a2f4d", category: "men", color: "white", addedAt: "2026-09-02" },

  // Shoes
  { id: "p-005", name: "Floral print pump", description: "Printed silk upper on a 95mm stiletto heel.", price: 112000, image: "1543163521-1bf539c55dd2", category: "shoes", color: "multi", addedAt: "2026-09-18" },
  { id: "p-029", name: "Suede pointed pump", description: "Midnight suede on a slim 100mm heel.", price: 96000, image: "1515347619252-60a4bf4fff4f", category: "shoes", color: "blue", addedAt: "2026-10-14" },
  { id: "p-030", name: "Panelled runner", description: "Mixed suede and mesh on a sculpted sole.", price: 72000, image: "1560769629-975ec94e6a86", category: "shoes", color: "multi", addedAt: "2026-10-29", badge: "New" },

  // Jewelry
  { id: "p-008", name: "Sculpted gold rings", description: "Set of two, cast in 18k gold-plated silver.", price: 72000, image: "1617038220319-276d3cfab638", category: "jewelry", color: "gold", addedAt: "2026-08-24" },
  { id: "p-031", name: "Filigree bracelet", description: "Rose gold vermeil with pavé crystals.", price: 58000, image: "1611591437281-460bfbe1220a", category: "jewelry", color: "gold", addedAt: "2026-09-26" },
  { id: "p-032", name: "Crescent pendant", description: "Gold chain with a crescent and blue topaz.", price: 46000, image: "1599643478518-a784e5dc4c8f", category: "jewelry", color: "gold", addedAt: "2026-10-20", badge: "New" },
  { id: "p-033", name: "Halo solitaire ring", description: "White gold with a brilliant-cut centre stone.", price: 485000, image: "1605100804763-247f67b3557e", category: "jewelry", color: "white", addedAt: "2026-07-09" },
  { id: "p-034", name: "Flower cocktail ring", description: "Amethyst and citrine petals in sterling silver.", price: 128000, image: "1602751584552-8ba73aad10e1", category: "jewelry", color: "multi", addedAt: "2026-10-07" },
  { id: "p-035", name: "Sapphire drop earrings", description: "Oval sapphires framed in crystal halos.", price: 164000, image: "1535632066927-ab7c9ab60908", category: "jewelry", color: "blue", addedAt: "2026-09-04" },

  // Accessories
  { id: "p-036", name: "Wool felt fedora", description: "Rabbit felt with a grosgrain band.", price: 54000, image: "1514327605112-b887c0e61c0a", category: "accessories", color: "blue", addedAt: "2026-10-16" },
  { id: "p-037", name: "Cat-eye sunglasses", description: "Gold metal frame with gradient lenses.", price: 39000, image: "1508296695146-257a814070b4", category: "accessories", color: "gold", addedAt: "2026-08-15" },
  { id: "p-038", name: "Crystal round sunglasses", description: "Clear acetate with brown mineral lenses.", price: 36000, image: "1577803645773-f96470509666", category: "accessories", color: "neutral", addedAt: "2026-07-27" },
  { id: "p-039", name: "Bridle leather belt", description: "English bridle leather with a brass buckle.", price: 29000, image: "1624222247344-550fb60583dc", category: "accessories", color: "brown", addedAt: "2026-09-10" },
  { id: "p-040", name: "Cotton twill cap", description: "Six-panel cap in washed cotton twill.", price: 14000, image: "1588850561407-ed78c282e89b", category: "accessories", color: "white", addedAt: "2026-10-23" },
  { id: "p-041", name: "Garment-dyed cap", description: "Faded canvas cap with a leather strap.", price: 16000, image: "1521369909029-2afed882baee", category: "accessories", color: "black", addedAt: "2026-08-07" },
];
