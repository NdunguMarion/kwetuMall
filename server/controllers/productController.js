import fs from "fs";
import productModel from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.send({
      message: "fetched products",
      data: products,
    });
  } catch (error) {
    res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.send({
      message: "fetched products",
      data: product,
    });
  } catch (error) {
    res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};
export const createProducts = async (req, res) => {
  try {
    //req.body ->gets text fields
    //req.files->gets files and images
    // to get the image use :req.files.images[0]

    let image = req.files.image[0];
    console.log(image);
    let extension = image.mimetype.split("/")[1];
    let newImageName = image.filename + "." + extension;

    //rename the image in uploads

    fs.rename(`./uploads/${image.filename}`, `./uploads/${newImageName}`, () =>
      console.log("Renamed image succesfully")
    );

    //save product to db

    const product = new productModel({
      name: req.body.name,
      image: newImageName,
      buyingPrice: req.body.buyingPrice,
      sellingPrice: req.body.sellingPrice,
      stock: req.body.stock,
      description: req.body.description,
      categories: JSON.parse(req.body.categories),
    });

    const newProduct = await product.save();

    res.send({
      message: "Created product",
      data: newProduct,
    });
  } catch (error) {
    res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    ///1.check if there is a new image
    const product = await productModel.findOne({ _id: req.params.id });
    product.name = req.body.name;
    product.buyingPrice = req.body.buyingPrice;
    product.sellingPrice = req.body.sellingPrice;
    product.stock = req.body.stock;
    product.description = req.body.description;
    product.categories = JSON.parse(req.body.categories);

    if (req.files.image) {
        console.log(req.files.image[0])
        console.log('product image', product.image)
      ///2.if there is a new image,delete the previous imge , rename new image and save changes to db
      fs.unlink(`./uploads/${product.image}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("file deleted");
        }
      });
      let image = req.files.image[0];
      let extension = image.mimetype.split("/")[1];
      let newImageName = image.filename + "." + extension;
      fs.rename(
        `./uploads/${image.filename}`,
        `./uploads/${newImageName}`,
        () => console.log("renamed image succesfully!")
      );

      product.image = newImageName;
      const newProduct = await product.save();
      res.send({
        message: "Updated product!",
        data: newProduct
      });
    } else {
      ///3. if no new image justsave changes to db
      const newProduct = await product.save();
      res.send({
        message: "Updated product!",
        data: newProduct
      });
    }
  } catch (error) {
    res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};
export const deleteProducts = async (req, res) => {
  /// ways to delete
  //1.find the product you will delete
  ///2.delete the image from the folder

  try {
    const product = await productModel.findOne({ _id: req.params.id });
    fs.unlink(`./uploads/${product.image}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file deleted");
      }
    });
    ///3.delete the actual aproduct
    await productModel.deleteOne({ _id: req.params.id });
    res.send({
      message: "Deleted products",
    });
  } catch (error) {
    res.send({
      message: "Error occured",
      data: error.message,
    });
  }
};
