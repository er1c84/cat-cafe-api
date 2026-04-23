import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../repositories/reservationRepo.js';

function notFound(id) {
  const error = new Error(`Reservation ${id} not found`);
  error.status = 404;
  return error;
}

function forbidden() {
  const error = new Error('Forbidden: insufficient permission');
  error.status = 403;
  return error;
}

function assertOwnerOrAdmin(reservation, user) {
  if (user.role !== 'ADMIN' && reservation.userId !== user.id) throw forbidden();
}

export function getAllReservations(options, user) {
  const userId = user.role === 'ADMIN' ? undefined : user.id;
  return getAll({ ...options, userId });
}

export async function getReservationById(id, user) {
  const reservation = await getById(id);
  if (!reservation) throw notFound(id);
  assertOwnerOrAdmin(reservation, user);
  return reservation;
}

export function createReservation(data, user) {
  return create({ ...data, userId: user.id });
}

export async function updateReservation(id, data, user) {
  await getReservationById(id, user);
  const reservation = await update(id, data);
  if (!reservation) throw notFound(id);
  return reservation;
}

export async function deleteReservation(id, user) {
  await getReservationById(id, user);
  const reservation = await remove(id);
  if (!reservation) throw notFound(id);
}
