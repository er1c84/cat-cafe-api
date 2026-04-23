import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../repositories/catRepo.js';

function notFound(id) {
  const error = new Error(`Cat ${id} not found`);
  error.status = 404;
  return error;
}

export function getAllCats(options) {
  return getAll(options);
}

export async function getCatById(id) {
  const cat = await getById(id);
  if (!cat) throw notFound(id);
  return cat;
}

export function createCat(data) {
  return create(data);
}

export async function updateCat(id, data) {
  const cat = await update(id, data);
  if (!cat) throw notFound(id);
  return cat;
}

export async function deleteCat(id) {
  const cat = await remove(id);
  if (!cat) throw notFound(id);
}
