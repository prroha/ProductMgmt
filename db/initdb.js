import config from "../config/index.js";
import dbConnect from "./db.js";

// CREATE TABLE IF NOT EXISTS products
try {
  dbConnect.run(
    `
CREATE TABLE IF NOT EXISTS products
(
id
INTEGER
PRIMARY
KEY
AUTOINCREMENT,
name
TEXT,
description
TEXT,
price
INTEGER,
category
TEXT,
imgurl
TEXT
)
`,
    (err) => {
      if (err) {
        console.log("Error creating table", err);
      } else {
        // Check for existing records and insert data only if the table is empty
        dbConnect.get("SELECT COUNT(*) FROM products", (err, count) => {
          if (err) {
            console.log("Error checking table", err);
          } else if (count["COUNT(*)"] === 0) {
            // Prepare and execute statements with parameters
            console.log("The count is zero");
            const insertStmt = dbConnect.prepare(
              "INSERT INTO products (name, description, price, category, imgurl) VALUES (?, ?, ?, ?, ?)"
            );
            insertStmt.run([
              "Earthen Bottle",
              "Earthen Bottle",
              "48",
              "bottle",
              "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
            ]);
            insertStmt.run([
              "Nomad Tumbler",
              "Nomad Tumbler",
              "36",
              "bottle",
              "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
            ]);
            insertStmt.run([
              "Focus Paper Refill",
              "Focus Paper Refill",
              "58",
              "bottle",
              "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
            ]);
            insertStmt.run([
              "Machined Mechanical Pencil",
              "Machined Mechanical Pencil",
              "18",
              "bottle",
              "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
            ]);
            // ... continue with remaining inserts using insertStmt
            // Close the prepared statement when finished
            insertStmt.finalize();
          } else {
            console.log("ALready products in the table ", count);
          }
        });
      }
    }
  );
} catch (e) {
  console.error(e);
}

// dbConnect.close();
