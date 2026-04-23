import {
  createVisit,
  deleteVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
} from '../services/visitService.js';

function visitBody(body) {
  const data = { ...body };
  if (data.reservationId !== undefined) {
    data.reservationId = parseInt(data.reservationId);
  }
  if (data.catId !== undefined) data.catId = parseInt(data.catId);
  return data;
}

export async function getAllVisitsHandler(req, res) {
  const { sortBy = 'id', order = 'asc', offset = 0, limit = 10 } = req.query;
  const visits = await getAllVisits({
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  });
  res.status(200).json(visits);
}

export async function getVisitByIdHandler(req, res) {
  const visit = await getVisitById(parseInt(req.params.id));
  res.status(200).json(visit);
}

export async function createVisitHandler(req, res) {
  const visit = await createVisit(visitBody(req.body));
  res.status(201).json(visit);
}

export async function updateVisitHandler(req, res) {
  const visit = await updateVisit(parseInt(req.params.id), visitBody(req.body));
  res.status(200).json(visit);
}

export async function deleteVisitHandler(req, res) {
  await deleteVisit(parseInt(req.params.id));
  res.status(204).send();
}
