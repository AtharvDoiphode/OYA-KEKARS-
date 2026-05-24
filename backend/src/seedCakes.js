import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Cake from "./models/Cake.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedData = [
  {
    name: "Sleeping Baby with Roses",
    category: "chocolates",
    image: "/assets/cakes/chocolates/Sleeping Baby with Roses/sleepingbabywithroses.png",
    price: 500,
    weight: "Premium Chocolate Sculpture",
    description: "An adorable handcrafted chocolate creation featuring a peacefully sleeping baby wrapped in a textured blanket and decorated with delicate pink roses. Designed with premium detailing and artistic finishing, this chocolate masterpiece is perfect for gifting, baby celebrations, and special occasions.",
    available: true
  },
  {
    name: "Pearl",
    category: "mini-cakes",
    image: "/assets/cakes/minicakes/pearl/pearl.png",
    price: 900,
    weight: "500 Gm",
    description: "A premium designer mini cake crafted with a rich velvet texture and intricate pearl-inspired detailing. Its sophisticated donut-ring shape and vibrant finish make it perfect for birthdays, celebrations, gifting, and special occasions.",
    available: true
  },
  {
    name: "Pillow Cake in Bento Box",
    category: "pastries",
    image: "/assets/cakes/pastries/Pillow/pillow.png",
    price: 250,
    weight: "Mini Bento Pastry",
    description: "A cute and luxurious pillow-style mini cake served inside a premium bento box. Designed with a soft velvet finish and topped with an elegant white heart accent, this dessert is perfect for birthdays, gifting, date surprises, and sweet celebrations.",
    available: true
  },
  {
    name: "The Waves with Sea Shells",
    category: "regular",
    image: "/assets/cakes/regular/The Waves with sea shells/seashells.png",
    price: 1250,
    weight: "1 Kg",
    description: "Elegant ocean-inspired cake featuring textured blue wave frosting, edible pearls, and handcrafted chocolate sea shells. Perfect for birthdays and special celebrations with a premium artistic finish.",
    available: true
  },
  {
    name: "Mermaid",
    category: "chocolates",
    image: "/assets/cakes/chocolates/mermaid/mermaid.png",
    price: 250,
    weight: "Premium Chocolate Sculpture",
    description: "A beautifully handcrafted mermaid-themed chocolate sculpture designed with intricate detailing, flowing hair, and a soft pastel mermaid tail finish. This premium edible art piece is perfect for gifting, kids' celebrations, themed desserts, and special occasions.",
    available: true
  },
  {
    name: "Curved Heart",
    category: "mini-cakes",
    image: "/assets/cakes/minicakes/curvedheart/curvedheart.png",
    price: 700,
    weight: "500 Gm",
    description: "A romantic designer mini cake crafted in a beautiful curved heart shape with a luxurious velvet texture and delicate crystal-style accents. Perfect for anniversaries, birthdays, Valentine’s celebrations, surprises, and gifting.",
    available: true
  },
  {
    name: "Red Peru Pastry",
    category: "pastries",
    image: "/assets/cakes/pastries/redperu/redperu.png",
    price: 180,
    weight: "Single Premium Pastry",
    description: "A premium handcrafted pastry inspired by tropical flavors and modern dessert artistry. The Red Peru pastry features a smooth velvet finish with a rich fruity center, creating the perfect balance of sweetness and freshness in every bite.",
    available: true
  },
  {
    name: "Pillow Cake",
    category: "regular",
    image: "/assets/cakes/regular/pillow cake/pillowcake.png",
    price: 1500,
    weight: "1 Kg",
    description: "Beautifully crafted pillow-inspired designer cake featuring a luxurious pink velvet texture with delicate pearl accents. Perfect for birthdays, anniversaries, and premium celebrations.",
    available: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
    
    // Insert new cakes (we won't delete existing ones just in case)
    await Cake.insertMany(seedData);
    
    console.log("Successfully seeded 8 initial cakes to the database!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
