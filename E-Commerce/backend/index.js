const port = 4000;
const express = require("express");
const app = express();
const mongoDB = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB (Atlas)
// mail : rovar951@gmail.com
// Project name : Ecommerce, Cluster0
// user : reactstackdev, password : ReactStackDev
mongoDB.connect("mongodb+srv://reactstackdev:ReactStackDev@cluster0.46nd5.mongodb.net/e-commerce");

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images", // ./
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})
app.use("/images", express.static("upload/images"))

// Creating Upload Endpoint for images
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
const Product = mongoDB.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

// API for Adding a Product
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

// API for Deleting a Product
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// API for Fetching All Products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema for User Login
const User = mongoDB.model("Users", {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Endpoint for User Registration
app.post("/signup", async (req, res) => {
    let check = await User.findOne({email: req.body.email});
    if (check) {
        return res.status(400).json({success: false, errors: "Existing User found with same Email Address!"});
    }
    let cart = {};
    for (let i=1; i<301; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    });
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, "secret_ecom");
    res.json({success: true, token});
})

// Endpoint for User Login
app.post("/login", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({success: true, token});
        } else {
            res.json({success: false, errors: "Wrong Password."});
        }
    } else {
        res.json({success: false, errors: "User not Found. Please Register."})
    }
})

// Endpoint for new collections data
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection");
    res.send(newcollection);
})

// Endpoint for Popular Items
app.get("/popularitemswomen", async (req, res) => {
    let products = await Product.find({category:"women"});
    let popularitemsamongwomen = products.slice(0,4);
    console.log("Popular Among Women");
    res.send(popularitemsamongwomen);
})

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send({errors: "Please authenticate using valid token."});
    } else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "please authenticate using a valid token."});
        }
    }
};

// Endpoint for adding items to the cart
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("adding ",req.body.itemId);
    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
})

// Endpoint to remove an item from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("removing ",req.body.itemId);
    let userData = await User.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Removed");
})

// Endpoint to fetch Cart Data on Login
app.post("/getcart", fetchUser, async (req, res) => {
    console.log("Fetching Cart");
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if(!error) {
        console.log("Server Running on Port "+port)
    } else {
        console.log("Error : "+error)
    }
})