import _ from 'lodash'
import db from './db.js'

const environment = process.env.NODE_ENV || 'development'
const config = {}
config.db = _.merge(db[environment], db['development'])

export default config
