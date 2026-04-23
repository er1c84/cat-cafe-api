import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    return await prisma.user.create({
      data,
      omit: { password: true },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
