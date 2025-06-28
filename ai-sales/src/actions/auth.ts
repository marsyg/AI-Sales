'use server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function onAuthenticateUser() {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 401,
        error: 'User not authenticated',
      };
    }
    const userExists = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (userExists) {
      return {
        status: 200,
        user: userExists,
      };
    }
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        profileImage: user.imageUrl || '',
        name:
          `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
          'Unknown User',
      },
    });

    if (!newUser) {
        console.error('Failed to create user in database');
      return {
        status: 500,
        error: 'Failed to create user',
      };
    }
    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.error('Error in onAuthenticateUser:', error);
    return {
      status: 500,
      error: 'Internal Server Error',
    };
  }
}
