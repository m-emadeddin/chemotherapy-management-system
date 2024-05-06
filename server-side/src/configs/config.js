require( 'dotenv' ).config()
module.exports = {
   development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialect:  process.env.DIALECT
   },

   production: {
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD, 
      database: process.env.DB_DATABASE, 
      dialect:  process.env.DIALECT, 
      logging: false 
      }
   }