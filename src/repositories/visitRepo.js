import prisma from '../config/db.js';

const include = {
  reservation: true,
  cat: true,
};

export function getAll({ sortBy, order, offset, limit }) {
  return prisma.visit.findMany({
    include,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
}

export function getById(id) {
  return prisma.visit.findUnique({
    where: { id },
    include,
  });
}

export async function create(data) {
  try {
    return await prisma.visit.create({ data, include });
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('This cat is already assigned to this reservation');
      err.status = 409;
      throw err;
    }
    if (error.code === 'P2003') {
      const err = new Error('Reservation or cat not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function update(id, data) {
  try {
    return await prisma.visit.update({
      where: { id },
      data,
      include,
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2002') {
      const err = new Error('This cat is already assigned to this reservation');
      err.status = 409;
      throw err;
    }
    if (error.code === 'P2003') {
      const err = new Error('Reservation or cat not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.visit.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
