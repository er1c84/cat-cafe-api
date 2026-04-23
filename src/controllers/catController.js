import {
  createCat,
  deleteCat,
  getAllCats,
  getCatById,
  updateCat,
} from '../services/catService.js';

function catBody(body) {
  const data = { ...body };
  if (data.age !== undefined) data.age = parseInt(data.age);
  return data;
}

export async function getAllCatsHandler(req, res) {
  const {
    status,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;

  const cats = await getAllCats({
    status,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  });
  res.status(200).json(cats);
}

export async function getCatByIdHandler(req, res) {
  const cat = await getCatById(parseInt(req.params.id));
  res.status(200).json(cat);
}

export async function createCatHandler(req, res) {
  const cat = await createCat(catBody(req.body));
  res.status(201).json(cat);
}

export async function updateCatHandler(req, res) {
  const cat = await updateCat(parseInt(req.params.id), catBody(req.body));
  res.status(200).json(cat);
}

export async function deleteCatHandler(req, res) {
  await deleteCat(parseInt(req.params.id));
  res.status(204).send();
}
