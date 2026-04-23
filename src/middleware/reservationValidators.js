import { body, oneOf, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
  handleValidationErrors,
];

export const validateReservationQuery = [
  query('status').optional().trim().escape().isString(),
  query('sortBy')
    .optional()
    .isIn(['id', 'date', 'time', 'numberGuests', 'status'])
    .withMessage('sortBy must be one of id, date, time, numberGuests, status'),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be asc or desc'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be between 1 and 50'),
  handleValidationErrors,
];

export const validateCreateReservation = [
  body('date')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Date is required')
    .bail()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Date must use YYYY-MM-DD format'),
  body('time')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Time is required')
    .bail()
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage('Time must use HH:mm format'),
  body('numberGuests')
    .exists({ values: 'falsy' })
    .withMessage('Number of guests is required')
    .bail()
    .isInt({ min: 1, max: 8 })
    .withMessage('Number of guests must be between 1 and 8'),
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be confirmed, cancelled, or completed'),
  handleValidationErrors,
];

export const validateUpdateReservation = [
  oneOf(
    [
      body('date').exists({ values: 'falsy' }),
      body('time').exists({ values: 'falsy' }),
      body('numberGuests').exists({ values: 'falsy' }),
      body('status').exists({ values: 'falsy' }),
    ],
    { message: 'At least one reservation field must be provided' },
  ),
  body('date')
    .optional()
    .trim()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Date must use YYYY-MM-DD format'),
  body('time')
    .optional()
    .trim()
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage('Time must use HH:mm format'),
  body('numberGuests')
    .optional()
    .isInt({ min: 1, max: 8 })
    .withMessage('Number of guests must be between 1 and 8'),
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled', 'completed'])
    .withMessage('Status must be confirmed, cancelled, or completed'),
  handleValidationErrors,
];
