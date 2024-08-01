import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};
