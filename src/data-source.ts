import { DataSource } from 'typeorm';
import { Customer } from './entity/Customer';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    synchronize: true,
    logging: false,
    entities: [Customer],
    migrations: [],
    subscribers: [],
});
