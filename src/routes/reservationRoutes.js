import express from 'express';
import {
  createReservationHandler,
  deleteReservationHandler,
  getAllReservationsHandler,
  getReservationByIdHandler,
  updateReservationHandler,
} from '../controllers/reservationController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validateCreateReservation,
  validateId,
  validateReservationQuery,
  validateUpdateReservation,
} from '../middleware/reservationValidators.js';

const router = express.Router();

router.get('/', authenticate, validateReservationQuery, getAllReservationsHandler);
router.get('/:id', authenticate, validateId, getReservationByIdHandler);
router.post('/', authenticate, validateCreateReservation, createReservationHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  validateUpdateReservation,
  updateReservationHandler,
);
router.delete('/:id', authenticate, validateId, deleteReservationHandler);

export default router;
