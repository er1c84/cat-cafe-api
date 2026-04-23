import prisma from '../config/db.js';

export function getAll({ status, sortBy, order, offset, limit }) {
  const where = status ? { status } : {};
  return prisma.cat.findMany({
    where,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
}

export function getById(id) {
  return prisma.cat.findUnique({
    where: { id },
    include: { visits: true },
  });
}

export function create(data) {
  return prisma.cat.create({ data });
}

export async function update(id, data) {
  try {
    return await prisma.cat.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.cat.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
