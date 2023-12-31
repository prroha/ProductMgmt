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
    databaseName: process.env.SQLITE_DB || 'product_mgmt_sqlite',
    username: process.env.SQLITE_USERNAME,
    password: process.env.SQLITE_PASSWORD,
    dialect: process.env.DB_DIALECT || 'sqlite',
  },
  test: {
    host: 'localhost',
    port: 27017,
    databaseName: 'product_test',
    username: '',
    password: '',
  },
}
