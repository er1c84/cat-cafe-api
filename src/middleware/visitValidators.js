import { body, oneOf, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
  handleValidationErrors,
];

export const validateVisitQuery = [
  query('sortBy')
    .optional()
    .isIn(['id', 'reservationId', 'catId'])
    .withMessage('sortBy must be one of id, reservationId, catId'),
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

export const validateCreateVisit = [
  body('reservationId')
    .exists({ values: 'falsy' })
    .withMessage('Reservation ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Reservation ID must be a positive integer'),
  body('catId')
    .exists({ values: 'falsy' })
    .withMessage('Cat ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Cat ID must be a positive integer'),
  handleValidationErrors,
];

export const validateUpdateVisit = [
  oneOf(
    [
      body('reservationId').exists({ values: 'falsy' }),
      body('catId').exists({ values: 'falsy' }),
    ],
    { message: 'At least one visit field must be provided' },
  ),
  body('reservationId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Reservation ID must be a positive integer'),
  body('catId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Cat ID must be a positive integer'),
  handleValidationErrors,
];
