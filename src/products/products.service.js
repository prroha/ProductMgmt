import ResponseError from "../../errors/ResponseError.js";
import _ from "lodash";
import dbConnect from "../../db/db.js";

export async function createProduct(params, callback) {
  const { name, description, price, category, imgurl } = params;
  dbConnect.run(
    "INSERT INTO products (name, description, price, category, imgurl) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, category, imgurl],
    function (err) {
      if (err) {
        return callback(err, null);
      }

      callback(null, {
        id: this.lastID,
        message: "Product created successfully",
      });
    }
  );
}

export function updateProduct(id, params, callback) {
  const { name, description, price, category, imgurl } = params;

  const updateFields = [];
  const updateValues = [];

  if (name !== undefined) {
    updateFields.push('name = ?');
    updateValues.push(name);
  }

  if (description !== undefined) {
    updateFields.push('description = ?');
    updateValues.push(description);
  }

  if (price !== undefined) {
    updateFields.push('price = ?');
    updateValues.push(price);
  }

  if (category !== undefined) {
    updateFields.push('category = ?');
    updateValues.push(category);
  }

  if (imgurl !== undefined) {
    updateFields.push('imgurl = ?');
    updateValues.push(imgurl);
  }
  const updateQuery = `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`;
  const updateParams = [...updateValues, id];

  dbConnect.run(updateQuery, updateParams, (err) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, { message: "Product updated successfully" });
  });
}

export async function getProduct(id, callback) {
  dbConnect.get("SELECT * FROM products WHERE id = ?", id, (err, row) => {
    if (err) {
      return callback(err, null);
    }

    if (!row) {
      return callback({ message: "Product not found" }, null);
    }

    callback(null, row);
  });
}

export async function listProducts(callback) {
  dbConnect.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.log(err);
      return callback(err, null);
    }

    callback(null, rows);
  });
}

export async function deleteProduct(id, callback) {
  dbConnect.run("DELETE FROM products WHERE id = ?", id, (err) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, { message: "Product deleted successfully" });
  });
}
