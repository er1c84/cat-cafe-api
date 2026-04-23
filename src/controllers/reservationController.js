import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
} from '../services/reservationService.js';

function reservationBody(body) {
  const data = { ...body };
  if (data.numberGuests !== undefined) {
    data.numberGuests = parseInt(data.numberGuests);
  }
  return data;
}

export async function getAllReservationsHandler(req, res) {
  const {
    status,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 10,
  } = req.query;

  const reservations = await getAllReservations(
    {
      status,
      sortBy,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit),
    },
    req.user,
  );
  res.status(200).json(reservations);
}

export async function getReservationByIdHandler(req, res) {
  const reservation = await getReservationById(parseInt(req.params.id), req.user);
  res.status(200).json(reservation);
}

export async function createReservationHandler(req, res) {
  const reservation = await createReservation(reservationBody(req.body), req.user);
  res.status(201).json(reservation);
}

export async function updateReservationHandler(req, res) {
  const reservation = await updateReservation(
    parseInt(req.params.id),
    reservationBody(req.body),
    req.user,
  );
  res.status(200).json(reservation);
}

export async function deleteReservationHandler(req, res) {
  await deleteReservation(parseInt(req.params.id), req.user);
  res.status(204).send();
}
