import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../repositories/visitRepo.js';

function notFound(id) {
  const error = new Error(`Visit ${id} not found`);
  error.status = 404;
  return error;
}

export function getAllVisits(options) {
  return getAll(options);
}

export async function getVisitById(id) {
  const visit = await getById(id);
  if (!visit) throw notFound(id);
  return visit;
}

export function createVisit(data) {
  return create(data);
}

export async function updateVisit(id, data) {
  const visit = await update(id, data);
  if (!visit) throw notFound(id);
  return visit;
}

export async function deleteVisit(id) {
  const visit = await remove(id);
  if (!visit) throw notFound(id);
}
