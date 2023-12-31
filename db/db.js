import sqlite3 from 'sqlite3'
import config from '../config/index.js'

const dbConfig = config.db
const fullDatabasePath = dbConfig.databasePath
  ? `${dbConfig.databasePath}/${dbConfig.databaseName}`
  : dbConfig.databaseName

const dbConnect = new sqlite3.Database(fullDatabasePath)

export default dbConnect
