'use server';

import prisma from '@/lib/database';
import { handleError } from '@/lib/utils';
import { User } from '@prisma/client';

// CREATE
export async function createUser(user: User) {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error('User not found');

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: user,
    });

    if (!updatedUser) throw new Error('User update failed');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    // Find user to delete
    const userToDelete = await prisma.user.delete({ where: { clerkId } });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(userToDelete || {}));
  } catch (error) {
    handleError(error);
  }
}
