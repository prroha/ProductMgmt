import _ from 'lodash'
import db from './db.js'

const environment = process.env.NODE_ENV || 'development'
const config = {}
config.db = _.merge(db[environment], db['development'])
config.API_URL = process.env.API_URL || 'http://localhost:5000'

export default config
