// module.exports = {
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password:process.env.DB_PASSWORD ,
//     database:process.env.DB_DATABASE,
//     define:{
//         timestamps:true,
//         underscored:true,
//         underscoredAll: true,
//     }
// }



// module.exports = {
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true,
//     }
// // }

// module.exports = {
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
    
//     // Isso apenas diz: "Se DB_SSL for true, use SSL. Caso contrário, não use nada ({})"
//     dialectOptions: process.env.DB_SSL === 'true' ? {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     } : {},

//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true,
//     }
// };

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  },
  production: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  }
};