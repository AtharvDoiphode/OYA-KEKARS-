import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cake from "./models/Cake.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 1. Read TS file
const tsPath = path.resolve(__dirname, "../../frontend/src/lib/newCakesCatalog.ts");
const tsContent = fs.readFileSync(tsPath, 'utf8');

// 2. Extract array string
const startIndex = tsContent.indexOf('[\n  {');
const endIndex = tsContent.lastIndexOf('];') + 1;

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find array bounds");
  process.exit(1);
}

const arrayString = tsContent.substring(startIndex, endIndex);

// 3. Evaluate it safely
let cakesArray = [];
try {
  cakesArray = eval(`(${arrayString})`);
} catch (e) {
  console.error("Failed to parse array", e);
  process.exit(1);
}

// 4. Transform to match DB schema
const seedData = cakesArray.map(cake => ({
  name: cake.name,
  category: cake.category || 'regular',
  price: cake.price || cake.basePrice || 0,
  weight: cake.baseWeight || '1 Kg',
  description: cake.description || cake.shortDescription || '',
  image: cake.image || '',
  available: true
}));

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
    
    // Clear existing to avoid duplicates
    await Cake.deleteMany({});
    
    // Insert new
    await Cake.insertMany(seedData);
    
    console.log(`Successfully seeded all ${seedData.length} cakes to the database!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
