const { MongoClient } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority` //

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.dbName = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) {
      this.cliente.connect(error => {
        if (error) {
          reject(error)
        }

        console.log('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  
}

