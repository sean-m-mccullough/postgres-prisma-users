import { Request, Response, NextFunction } from 'express';


interface ErrorWithStack extends Error {
    stack?: string;
}

export default function errorHandler(
    err: ErrorWithStack,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
}