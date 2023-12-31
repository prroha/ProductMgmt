import * as productService from "./products.service.js";
import ResponseError from "../../errors/ResponseError.js";

export async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, imgurl } = req.body;
    if (!name || !description || !price || !category || !imgurl) {
      return res
        .status(400)
        .json({ type:'error',error: "Name, description, price and category are required." });
    }

    // Insert the new product into the database
    await productService.createProduct({ name, description, price, category, imgurl }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).send({
        status: "success",
        object: "product",
        result,
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ type:'error', error: "No id was received" });
    }
    await productService.getProduct(id, (err, product) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).send({
        status: "success",
        object: "product",
        product,
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price, category, imgurl } = req.body;

    if (!name && !description && !price && !category && !imgurl) {
      return res
        .status(400)
        .json({ type:'error', error: "Value is missing. SO no update was done." });
    }

    // Update the product in the database
    await productService.updateProduct(id, { name, description, price, category, imgurl }, (err, result) => {
      if (err) {
        return res.status(500).json({ type:'error', error: err.message });
      }

      res.status(201).send({
        status: "success",
        object: "product",
        result,
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function listProducts(req, res, next) {
  try {
    await productService.listProducts((err, products) => {
      if (err) {
        return res.status(500).json({ type:'error', error: err.message });
      }
      res.status(200).send({
        status: "success",
        object: "product",
        products,
      });
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    // Delete the product from the database
    await productService.deleteProduct(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(201).json({
        object: "product",
        status: "success",
        result,
      });
    });
  } catch (error) {
    return next(error);
  }
}
