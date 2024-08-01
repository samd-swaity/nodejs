"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./entity/Customer");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    synchronize: true,
    logging: false,
    entities: [Customer_1.Customer],
    migrations: [],
    subscribers: [],
});
