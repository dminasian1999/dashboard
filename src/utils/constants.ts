// ====== Imports ======

// ====== Assets ======

// ====== Navigation ======
import type {NavItemT} from "./types.ts";

export const navItems: NavItemT[] = [
  { title: "Home", route: "home" },
  { title: "Shop", route: "shop" },
  { title: "Collections", route: "collections" },
  { title: "About", route: "about" },
  { title: "Contact", route: "contact" },
];

// ====== Collections ======

// export const baseUrl = "http://localhost:8080/users";
// export const baseUrlBlog = "http://localhost:8080";
export const baseUrl = "https://shrek-back.onrender.com/users";
export const baseUrlBlog = "https://shrek-back.onrender.com";
export const createToken = (login: string, password: string) =>
  `Basic ${window.btoa(`${login}:${password}`)}`;

// ====== Admin Info ======
export const adminInfo = {
  username: "admin",
  firstName: "Jewelry",
  lastName: "Admin",
  phone: "+9725858585",
  address: "Old City, Jerusalem, Israel",
  city: "Israel",
  email: "sevan@gmail.com",
};

// ====== Defaults & Timers ======
export const defaultPic = "";
export const periodMinute = 10000 * 60 * 10; // 10 hours

// ====== Materials ======
export const allMaterials = [
  "Wood", "Metal", "Plastic", "Glass", "Stone", "Ceramic", "Textile", "Leather", "Paper",
  "Gold", "Silver", "Bronze", "Copper", "Iron", "Steel", "Marble", "Concrete", "Clay",
  "Wool", "Cotton", "Silk", "Bamboo", "Porcelain",
];

// ====== Categories with Types ======
export const categories = [
  {
    title: "Ceramics",
    imageUrl: "https://c7.alamy.com/comp/CXD46G/romanian-traditional-pottery-on-display-for-sale-CXD46G.jpg",
    route: "ceramics",
    types: [
      { title: "Tiles, name-tiles & coasters", route: "tiles", icon: "fa fa-th-large" },
      { title: "Biblical tiles", route: "biblical-tiles", icon: "fa fa-book" },
      { title: "Tables, murals & borders", route: "tables-murals-borders", icon: "fa fa-border-style" },
      { title: "Armenian", route: "armenian", icon: "fa fa-flag" },
      { title: "Judaica", route: "judaica", icon: "fa fa-star-of-david" },
      { title: "Bowls", route: "bowls", icon: "fa fa-bowl-rice" },
      { title: "Pomegranates", route: "pomegranates", icon: "fa fa-apple-alt" },
      { title: "Vases", route: "vases", icon: "fa fa-wine-bottle" },
      { title: "Assorted Pottery", route: "assorted-pottery", icon: "fa fa-shapes" },
      { title: "Mugs", route: "mugs", icon: "fa fa-mug-hot" },
      { title: "Hangings", route: "hangings", icon: "fa fa-image" },
      { title: "Spoon rests", route: "spoon-rests", icon: "fa fa-spoon" },
    ],
  },
  {
    title: "Jewelry",
    imageUrl: "https://e-com-front-nine.vercel.app/assets/jewelry-BLreq-ud.jpg",
    route: "jewelry",
    icon: "fa fa-gem",
    types: [
      { title: "Rings", route: "jewelry/rings", icon: "fa fa-ring" },
      { title: "Necklaces", route: "jewelry/necklaces", icon: "fa fa-link" },
      { title: "Earrings", route: "jewelry/earrings", icon: "fa fa-circle" },
      { title: "Bracelets", route: "jewelry/bracelets", icon: "fa fa-bars" },
    ],
  },
  {
    title: "Religious",
    imageUrl: "https://thumbs.dreamstime.com/b/interesting-collection-bronze-items-silvering-gilding-green-patina-weapons-doorknobs-bells-dishes-production-different-235851117.jpg",
    route: "religious",
    types: [
      { title: "Crosses", route: "religious/crosses", icon: "fa fa-cross" },
      { title: "Icons", route: "religious/icons", icon: "fa fa-image" },
      { title: "Prayer Books & Bibles", route: "religious/books", icon: "fa fa-book" },
      { title: "Incense, Oils & Prayer Items", route: "religious/incense-oils", icon: "fa fa-fire" },
      { title: "Church Crafts", route: "religious/church-crafts", icon: "fa fa-church" },
      { title: "Brochures & Prayers", route: "religious/brochures", icon: "fa fa-scroll" },
      { title: "Candles", route: "religious/candles", icon: "fa fa-candle-holder" },
      { title: "Pilgrimage Souvenirs", route: "religious/pilgrimage-souvenirs", icon: "fa fa-walking" },
      { title: "Saint Figurines", route: "religious/saint-figurines", icon: "fa fa-user-nurse" },
      { title: "Religious Jewelry", route: "religious/jewelry", icon: "fa fa-gem" },
    ],
  },
  {
    title: "Souvenirs",
    imageUrl: "https://cdn.sanity.io/images/hqzqrzyr/production-icelolly/5c799fe6328b06f295de4ecfe5daf032d2c3083e-4000x2667.jpg?rect=0,482,4000,1704&w=1080&h=460&q=70&fit=crop&auto=format&dpr=2",
    route: "souvenirs",
    types: [
      { title: "Keychains", route: "souvenirs/keychains", icon: "fa fa-key" },
      { title: "Postcards & Magnets", route: "souvenirs/postcards-magnets", icon: "fa fa-paperclip" },
      { title: "Mini Statues", route: "souvenirs/mini-statues", icon: "fa fa-chess-knight" },
      { title: "Tiles", route: "souvenirs/tiles", icon: "fa fa-border-all" },
      { title: "Gift Packaging", route: "souvenirs/gift-packaging", icon: "fa fa-box" },
      { title: "Personal Accessories", route: "souvenirs/personal-accessories", icon: "fa fa-user" },
      { title: "Holy Water, Oils & Scents", route: "souvenirs/holy-scents", icon: "fa fa-leaf" },
      { title: "Games & Gift Sets", route: "souvenirs/gift-sets", icon: "fa fa-gift" },
      { title: "Booklets & Guides", route: "souvenirs/guides", icon: "fa fa-map" },
      { title: "Home Décor", route: "souvenirs/home-decor", icon: "fa fa-home" },
    ],
  },
];
export const sizeOptions = [
  { name: "XS", value: "XS" },
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
  { name: "Custom…", value: "custom" },
];
