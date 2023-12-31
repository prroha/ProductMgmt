export default {
  development: {
    host: 'localhost',
    port: 27017,
    databaseName: 'product_mgmt_sqlite',
    databasePath: 'data',
    username: '',
    password: '',
    dialect: 'sqlite',
  },
  production: {
    host: process.env.SQLITE_HOST,
    port: process.env.SQLITE_PORT,
    databaseName: process.env.SQLITE_DB,
    username: process.env.SQLITE_USERNAME,
    password: process.env.SQLITE_PASSWORD,
  },
  test: {
    host: 'localhost',
    port: 27017,
    databaseName: 'product_test',
    username: '',
    password: '',
  },
}
