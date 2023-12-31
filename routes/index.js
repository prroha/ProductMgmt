import productsRoutes from './products.routes.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import config from '../config/index.js'
import * as productService from '../src/products/products.service.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default (app) => {
  /* GET home page. */
  app.route('/').get(async function (req, res, next) {
    await productService.listProducts((err, products) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.render('index', { products: products, API_URL: config.API_URL })
    })
  })

  app.route('/public/stylesheets/style.css').get((req, res) => {
    res.setHeader('Content-Type', 'text/css')
    res.sendFile(path.join(__dirname, '../public/stylesheets/style.css')) // Send the actual file content
  })

  productsRoutes(app)
}
