import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import customerRouter from './routes/customer';
import { errorHandler } from './middleware/errorHandler';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());

    app.use('/customers', customerRouter);

    app.use(errorHandler);

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => console.log(error));
