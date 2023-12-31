import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../src/products/products.controller.js'

export default (app) => {
  app.route('/products').post(createProduct)
  app.route('/products/:id').patch(updateProduct)
  app.route('/products').get(listProducts)
  app.route('/products/:id').get(getProduct)
  app.route('/products/:id').delete(deleteProduct)
}
