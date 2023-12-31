const Product = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: [{ type: String }],
  resetToken: [{ type: String }],
  name: '',
}

export default Product
