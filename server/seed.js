
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { resource_type: "image" });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error.message);
        return null;
    }
};

// Image Paths
const assetsPath = path.join(__dirname, "../client/src/assets");

const organic_vegitable_image = path.join(assetsPath, "organic_vegitable_image.png");
const fresh_fruits_image = path.join(assetsPath, "fresh_fruits_image.png");
const bottles_image = path.join(assetsPath, "bottles_image.png");
const maggi_image = path.join(assetsPath, "maggi_image.png");
const dairy_product_image = path.join(assetsPath, "dairy_product_image.png");
const bakery_image = path.join(assetsPath, "bakery_image.png");
const grain_image = path.join(assetsPath, "grain_image.png");
const potato_image_1 = path.join(assetsPath, "potato_image_1.png");
const potato_image_2 = path.join(assetsPath, "potato_image_2.png");
const potato_image_3 = path.join(assetsPath, "potato_image_3.png");
const potato_image_4 = path.join(assetsPath, "potato_image_4.png");
const tomato_image = path.join(assetsPath, "tomato_image.png");
const carrot_image = path.join(assetsPath, "carrot_image.png");
const apple_image = path.join(assetsPath, "apple_image.png");
const amul_milk_image = path.join(assetsPath, "amul_milk_image.png");
const coca_cola_image = path.join(assetsPath, "coca_cola_image.png");
const brown_bread_image = path.join(assetsPath, "brown_bread_image.png");
const basmati_rice_image = path.join(assetsPath, "basmati_rice_image.png");
const paneer_image = path.join(assetsPath, "paneer_image.png");
const orange_image = path.join(assetsPath, "orange_image.png");
const pepsi_image = path.join(assetsPath, "pepsi_image.png");
const wheat_flour_image = path.join(assetsPath, "wheat_flour_image.png");
const cheese_image = path.join(assetsPath, "cheese_image.png");
const eggs_image = path.join(assetsPath, "eggs_image.png");
const spinach_image_1 = path.join(assetsPath, "spinach_image_1.png");
const onion_image_1 = path.join(assetsPath, "onion_image_1.png");
const banana_image_1 = path.join(assetsPath, "banana_image_1.png");
const mango_image_1 = path.join(assetsPath, "mango_image_1.png");
const grapes_image_1 = path.join(assetsPath, "grapes_image_1.png");
const paneer_image_2 = path.join(assetsPath, "paneer_image_2.png");
const sprite_image_1 = path.join(assetsPath, "sprite_image_1.png");
const fanta_image_1 = path.join(assetsPath, "fanta_image_1.png");
const seven_up_image_1 = path.join(assetsPath, "seven_up_image_1.png");
const top_ramen_image = path.join(assetsPath, "top_ramen_image.png");
const knorr_soup_image = path.join(assetsPath, "knorr_soup_image.png");
const yippee_image = path.join(assetsPath, "yippee_image.png");
const maggi_oats_image = path.join(assetsPath, "maggi_oats_image.png");
const butter_croissant_image = path.join(assetsPath, "butter_croissant_image.png");
const chocolate_cake_image = path.join(assetsPath, "chocolate_cake_image.png");
const whole_wheat_bread_image = path.join(assetsPath, "whole_wheat_bread_image.png");
const vanilla_muffins_image = path.join(assetsPath, "vanilla_muffins_image.png");
const quinoa_image = path.join(assetsPath, "quinoa_image.png");
const brown_rice_image = path.join(assetsPath, "brown_rice_image.png");
const barley_image = path.join(assetsPath, "barley_image.png");


const dummyProducts = [
    // Vegetables
    {
        _id: "gd46g23h",
        name: "Potato 500g",
        category: "Vegetables",
        price: 25,
        offerPrice: 20,
        image: [potato_image_1, potato_image_2, potato_image_3, potato_image_4],
        description: [
            "Fresh and organic",
            "Rich in carbohydrates",
            "Ideal for curries and fries",
        ],
        inStock: true,
    },
    {
        _id: "gd47g34h",
        name: "Tomato 1 kg",
        category: "Vegetables",
        price: 40,
        offerPrice: 35,
        image: [tomato_image],
        description: [
            "Juicy and ripe",
            "Rich in Vitamin C",
            "Perfect for salads and sauces",
            "Farm fresh quality",
        ],
        inStock: true,
    },
    {
        _id: "gd48g45h",
        name: "Carrot 500g",
        category: "Vegetables",
        price: 30,
        offerPrice: 28,
        image: [carrot_image],
        description: [
            "Sweet and crunchy",
            "Good for eyesight",
            "Ideal for juices and salads",
        ],
        inStock: true,
    },
    {
        _id: "gd49g56h",
        name: "Spinach 500g",
        category: "Vegetables",
        price: 18,
        offerPrice: 15,
        image: [spinach_image_1],
        description: [
            "Rich in iron",
            "High in vitamins",
            "Perfect for soups and salads",
        ],
        inStock: true,
    },
    {
        _id: "gd50g67h",
        name: "Onion 500g",
        category: "Vegetables",
        price: 22,
        offerPrice: 19,
        image: [onion_image_1],
        description: [
            "Fresh and pungent",
            "Perfect for cooking",
            "A kitchen staple",
        ],
        inStock: true,
    },

    // Fruits
    {
        _id: "ek51j12k",
        name: "Apple 1 kg",
        category: "Fruits",
        price: 120,
        offerPrice: 110,
        image: [apple_image],
        description: [
            "Crisp and juicy",
            "Rich in fiber",
            "Boosts immunity",
            "Perfect for snacking and desserts",
            "Organic and farm fresh",
        ],
        inStock: true,
    },
    {
        _id: "ek52j23k",
        name: "Orange 1 kg",
        category: "Fruits",
        price: 80,
        offerPrice: 75,
        image: [orange_image],
        description: [
            "Juicy and sweet",
            "Rich in Vitamin C",
            "Perfect for juices and salads",
        ],
        inStock: true,
    },
    {
        _id: "ek53j34k",
        name: "Banana 1 kg",
        category: "Fruits",
        price: 50,
        offerPrice: 45,
        image: [banana_image_1],
        description: [
            "Sweet and ripe",
            "High in potassium",
            "Great for smoothies and snacking",
        ],
        inStock: true,
    },
    {
        _id: "ek54j45k",
        name: "Mango 1 kg",
        category: "Fruits",

        price: 150,
        offerPrice: 140,
        image: [mango_image_1],
        description: [
            "Sweet and flavorful",
            "Perfect for smoothies and desserts",
            "Rich in Vitamin A",
        ],
        inStock: true,
    },
    {
        _id: "ek55j56k",
        name: "Grapes 500g",
        category: "Fruits",
        price: 70,
        offerPrice: 65,
        image: [grapes_image_1],
        description: [
            "Fresh and juicy",
            "Rich in antioxidants",
            "Perfect for snacking and fruit salads",
        ],
        inStock: true,
    },

    // Dairy
    {
        _id: "ek56j67k",
        name: "Amul Milk 1L",
        category: "Dairy",
        price: 60,
        offerPrice: 55,
        image: [amul_milk_image],
        description: [
            "Pure and fresh",
            "Rich in calcium",
            "Ideal for tea, coffee, and desserts",
            "Trusted brand quality",
        ],
        inStock: true,
    },
    {
        _id: "ek57j78k",
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: [paneer_image],
        description: [
            "Soft and fresh",
            "Rich in protein",
            "Ideal for curries and snacks",
        ],
        inStock: true,
    },
    {
        _id: "ek58j89k",
        name: "Eggs 12 pcs",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: [eggs_image],
        description: [
            "Farm fresh",
            "Rich in protein",
            "Ideal for breakfast and baking",
        ],
        inStock: true,
    },
    {
        _id: "ek59j90k",
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: [paneer_image_2],
        description: [
            "Soft and fresh",
            "Rich in protein",
            "Ideal for curries and snacks",
        ],
        inStock: true,
    },
    {
        _id: "ek60j01k",
        name: "Cheese 200g",
        category: "Dairy",
        price: 140,
        offerPrice: 130,
        image: [cheese_image],
        description: [
            "Creamy and delicious",
            "Perfect for pizzas and sandwiches",
            "Rich in calcium",
        ],
        inStock: true,
    },

    // Drinks
    {
        _id: "ek61j12k",
        name: "Coca-Cola 1.5L",
        category: "Drinks",
        price: 80,
        offerPrice: 75,
        image: [coca_cola_image],
        description: [
            "Refreshing and fizzy",
            "Perfect for parties and gatherings",
            "Best served chilled",
        ],
        inStock: true,
    },
    {
        _id: "ek62j23k",
        name: "Pepsi 1.5L",
        category: "Drinks",
        price: 78,
        offerPrice: 73,
        image: [pepsi_image],
        description: [
            "Chilled and refreshing",
            "Perfect for celebrations",
            "Best served cold",
        ],
        inStock: true,
    },
    {
        _id: "ek63j34k",
        name: "Sprite 1.5L",
        category: "Drinks",
        price: 79,
        offerPrice: 74,
        image: [sprite_image_1],
        description: [
            "Refreshing citrus taste",
            "Perfect for hot days",
            "Best served chilled",
        ],
        inStock: true,
    },
    {
        _id: "ek64j45k",
        name: "Fanta 1.5L",
        category: "Drinks",
        price: 77,
        offerPrice: 72,
        image: [fanta_image_1],
        description: [
            "Sweet and fizzy",
            "Great for parties and gatherings",
            "Best served cold",
        ],
        inStock: true,
    },
    {
        _id: "ek65j56k",
        name: "7 Up 1.5L",
        category: "Drinks",
        price: 76,
        offerPrice: 71,
        image: [seven_up_image_1],
        description: [
            "Refreshing lemon-lime flavor",
            "Perfect for refreshing",
            "Best served chilled",
        ],
        inStock: true,
    },

    // Grains
    {
        _id: "ek66j67k",
        name: "Basmati Rice 5kg",
        category: "Grains",
        price: 550,
        offerPrice: 520,
        image: [basmati_rice_image],
        description: [
            "Long grain and aromatic",
            "Perfect for biryani and pulao",
            "Premium quality",
        ],
        inStock: true,
    },
    {
        _id: "ek67j78k",
        name: "Wheat Flour 5kg",
        category: "Grains",
        price: 250,
        offerPrice: 230,
        image: [wheat_flour_image],
        description: [
            "High-quality whole wheat",
            "Soft and fluffy rotis",
            "Rich in nutrients",
        ],
        inStock: true,
    },
    {
        _id: "ek68j89k",
        name: "Organic Quinoa 500g",
        category: "Grains",
        price: 450,
        offerPrice: 420,
        image: [quinoa_image],
        description: [
            "High in protein and fiber",
            "Gluten-free",
            "Rich in vitamins and minerals",
        ],
        inStock: true,
    },
    {
        _id: "ek69j90k",
        name: "Brown Rice 1kg",
        category: "Grains",
        price: 120,
        offerPrice: 110,
        image: [brown_rice_image],
        description: [
            "Whole grain and nutritious",
            "Helps in weight management",
            "Good source of magnesium",
        ],
        inStock: true,
    },
    {
        _id: "ek70j01k",
        name: "Barley 1kg",
        category: "Grains",
        price: 150,
        offerPrice: 140,
        image: [barley_image],
        description: [
            "Rich in fiber",
            "Helps improve digestion",
            "Low in fat and cholesterol",
        ],
        inStock: true,
    },

    // Bakery
    {
        _id: "bk01a24z",
        name: "Brown Bread 400g",
        category: "Bakery",
        price: 40,
        offerPrice: 35,
        image: [brown_bread_image],
        description: [
            "Soft and healthy",
            "Made from whole wheat",
            "Ideal for breakfast and sandwiches",
        ],
        inStock: true,
    },
    {
        _id: "bk02b30y",
        name: "Butter Croissant 100g",
        category: "Bakery",
        price: 50,
        offerPrice: 45,
        image: [butter_croissant_image],
        description: [
            "Flaky and buttery",
            "Freshly baked",
            "Perfect for breakfast or snacks",
        ],
        inStock: true,
    },
    {
        _id: "bk03c31x",
        name: "Chocolate Cake 500g",
        category: "Bakery",
        price: 350,
        offerPrice: 325,
        image: [chocolate_cake_image],
        description: [
            "Rich and moist",
            "Made with premium cocoa",
            "Ideal for celebrations and parties",
        ],
        inStock: true,
    },
    {
        _id: "bk04d32w",
        name: "Whole Bread 400g",
        category: "Bakery",
        price: 45,
        offerPrice: 40,
        image: [whole_wheat_bread_image],
        description: [
            "Healthy and nutritious",
            "Made with whole wheat flour",
            "Ideal for sandwiches and toast",
        ],
        inStock: true,
    },
    {
        _id: "bk05e33v",
        name: "Vanilla Muffins 6 pcs",
        category: "Bakery",
        price: 100,
        offerPrice: 90,
        image: [vanilla_muffins_image],
        description: [
            "Soft and fluffy",
            "Perfect for a quick snack",
            "Made with real vanilla",
        ],
        inStock: true,
    },

    // Instant
    {
        _id: "in01f25u",
        name: "Maggi Noodles 280g",
        category: "Instant",

        price: 55,
        offerPrice: 50,
        image: [maggi_image],
        description: [
            "Instant and easy to cook",
            "Delicious taste",
            "Popular among kids and adults",
        ],
        inStock: true,
    },
    {
        _id: "in02g26t",
        name: "Top Ramen 270g",
        category: "Instant",
        price: 45,
        offerPrice: 40,
        image: [top_ramen_image],
        description: [
            "Quick and easy to prepare",
            "Spicy and flavorful",
            "Loved by college students and families",
        ],
        inStock: true,
    },
    {
        _id: "in03h27s",
        name: "Knorr Cup Soup 70g",
        category: "Instant",
        price: 35,
        offerPrice: 30,
        image: [knorr_soup_image],
        description: [
            "Convenient for on-the-go",
            "Healthy and nutritious",
            "Variety of flavors",
        ],
        inStock: true,
    },
    {
        _id: "in04i28r",
        name: "Yippee Noodles 260g",
        category: "Instant",
        price: 50,
        offerPrice: 45,
        image: [yippee_image],
        description: [
            "Non-fried noodles for healthier choice",
            "Tasty and filling",
            "Convenient for busy schedules",
        ],
        inStock: true,
    },
    {
        _id: "in05j29q",
        name: "Oats Noodles 72g",
        category: "Instant",
        price: 40,
        offerPrice: 35,
        image: [maggi_oats_image],
        description: [
            "Healthy alternative with oats",
            "Good for digestion",
            "Perfect for breakfast or snacks",
        ],
        inStock: true,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");

        for (const product of dummyProducts) {
            console.log(`Processing ${product.name}...`);
            const imageUrls = [];

            console.log(`Uploading ${product.image.length} images...`);
            for (const imgPath of product.image) {
                // console.log(`Uploading ${imgPath}...`);
                const url = await uploadImage(imgPath);
                if (url) {
                    imageUrls.push(url);
                } else {
                    console.error(`Failed to upload image: ${imgPath}`);
                }
            }

            console.log(`Got ${imageUrls.length} image URLs`);

            // Remove _id to let MongoDB generate a valid ObjectId
            const { _id, ...productData } = product;

            const newProduct = new Product({
                ...productData,
                image: imageUrls
            });

            try {
                await newProduct.save();
                console.log(`Saved ${product.name}`);
            } catch (saveError) {
                console.error(`Failed to save ${product.name}:`, saveError.message);
                if (saveError.errors) {
                    Object.keys(saveError.errors).forEach(key => {
                        console.error(`Validation error for ${key}: ${saveError.errors[key].message}`);
                    });
                }
            }
        }

        console.log("Seeding complete!");
        process.exit(0);

    } catch (error) {
        console.error("Seeding failed (Global):", error);
        process.exit(1);
    }
};

seedDB();
