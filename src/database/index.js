// import mongoose from 'mongoose';
// import { Sequelize } from 'sequelize';
// import Category from '../app/models/Category.js';
// import Product from '../app/models/Product.js';
// import User from '../app/models/User.js';
// import databaseConfig from '../config/database.cjs';

// const models = [User, Product, Category];

// class Database {
//   constructor() {
//     this.init();
//     this.mongo();
//   }

//   init() {
//     this.connection = new Sequelize(databaseConfig);
//     models
//       .map((model) => model.init(this.connection))
//       .map(
//         (model) => model.associate && model.associate(this.connection.models),
//       );
//   }

//   mongo() {
//     this.mongooseConncetion = mongoose.connect(
//       process.env.MONGO_URL
//     );
//   }
// }

// export default new Database();
 import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import Category from '../app/models/Category.js';
import Product from '../app/models/Product.js';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.cjs';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    const env = process.env.NODE_ENV || 'development';
    const config = databaseConfig[env];

    this.connection = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        port: config.port,
        dialect: 'postgres',
        dialectOptions: config.dialectOptions,
        logging: false,
        define: config.define,
      }
    );

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    this.mongooseConncetion = mongoose.connect(
      process.env.MONGO_URL
    );
  }
}

export default new Database();