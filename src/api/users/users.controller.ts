import { Request, Response, NextFunction } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from './users.service';

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    try {
        const user = await getUserById(Number(userId));

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
}

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    try {
        const createdUser = await createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
        //getUserById
        const existingUser = await getUserById(Number(userId));
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // updateUser
        const user = await updateUser(Number(userId), updatedUser);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    
    try {
        await deleteUser(Number(userId));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}