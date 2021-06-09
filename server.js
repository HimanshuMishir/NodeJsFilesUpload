const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const product_catalog = require("./models/products");

const database_url = process.env.DBURL;
//console.log(database_url)
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on("err", console.log);

const app = express();
//app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "https://partyshopping.herokuapp.com" }));
app.use(express.static("public"));
app.use(express.static("uploads"));

// *** To upload data and files to the server...........

app.post("/upload", (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const id = uuid();
      const filepath = `${id}${ext}`;
      callback(null, filepath);
    },
  });
  const upload = multer({ storage }).array("file", 10);
  upload(req, res, (err) => {
    const item = req.body;
    var paths = [];

    req.files.forEach((element) => {
      paths.push(element.filename);
      console.log(element);
    });

    const product = {
      product_name: item.product_name,
      product_brand: item.product_brand,
      product_description: item.productDescription,
      product_images_path: paths,
      product_available_for: [item.gender],
      product_wear_catagory: item.product_catagory,
      product_specific: {
        product: [
          {
            color: item.color,
            stocks: item.numOfStocks,
            price: item.price,
            size: item.productSize[0],
          },
        ],
        product_sizes: item.productSize,
      },
    };
    const response = product_catalog.create(product);
    //
    if (!err) {
      res.redirect("/");
    } else {
      console.log(response);
      console.log(err);
    }
  });
});

// *** API to get the data from the server.............

app.get("/api/getproductinfo", async (req, res) => {
  const products = await product_catalog.find({});
  console.log('api called')
  res.json(products);
});

// ***  API to update data in the database ............

app.post("/api/updateproductinfo", async (req, res) => {
  const item = req.body;

  const newproductinfo = {
    product_name: item.product_name,
    product_brand: item.product_brand,
    product_description: item.productDescription,
    product_images_path: paths,
    product_available_for: [item.gender],
    product_wear_catagory: item.product_catagory,
    product_specific: {
      product: [
        {
          color: item.color,
          stocks: item.numOfStocks,
          price: item.price,
          size: item.productSize[0],
        },
      ],
      product_sizes: item.productSize,
    },
  };
  const products = await product_catalog.findByIdAndUpdate()
});

app.listen(process.env.PORT, () =>
  console.log(`The server is running on port: ${process.env.PORT}`)
);
