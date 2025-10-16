import { prisma } from '../../lib/prisma';

export interface CreateUserData {
    name: string;
    email: string;
}

export interface UpdateUserData {
    name?: string;
    email?: string;
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        orderBy: { id: 'asc' }
    });
};

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id }
    });
};

export const createUser = async (data: CreateUserData) => {
    return await prisma.user.create({
        data
    });
};

export const updateUser = async (id: number, data: UpdateUserData) => {
    return await prisma.user.update({
        where: { id },
        data
    });
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id }
    });
};

export const userExists = async (id: number): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true }
    });
    return !!user;
};