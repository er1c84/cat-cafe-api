import prisma from '../config/db.js';

const include = {
  user: { select: { id: true, email: true, role: true } },
  visits: { include: { cat: true } },
};

export function getAll({ userId, status, sortBy, order, offset, limit }) {
  const where = {};
  if (userId) where.userId = userId;
  if (status) where.status = status;

  return prisma.reservation.findMany({
    where,
    include,
    orderBy: { [sortBy]: order },
    skip: offset,
    take: limit,
  });
}

export function getById(id) {
  return prisma.reservation.findUnique({
    where: { id },
    include,
  });
}

export function create(data) {
  return prisma.reservation.create({ data, include });
}

export async function update(id, data) {
  try {
    return await prisma.reservation.update({
      where: { id },
      data,
      include,
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.reservation.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
