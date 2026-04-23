import { body, oneOf, param, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Id must be a positive integer'),
  handleValidationErrors,
];

export const validateCatQuery = [
  query('status').optional().trim().escape().isString(),
  query('sortBy')
    .optional()
    .isIn(['id', 'name', 'age', 'breed', 'status'])
    .withMessage('sortBy must be one of id, name, age, breed, status'),
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

export const validateCreateCat = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('age')
    .exists({ values: 'falsy' })
    .withMessage('Age is required')
    .bail()
    .isInt({ min: 0, max: 30 })
    .withMessage('Age must be between 0 and 30'),
  body('breed')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Breed is required')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Breed must be at least 2 characters'),
  body('status')
    .optional()
    .trim()
    .isIn(['available', 'resting', 'adopted'])
    .withMessage('Status must be available, resting, or adopted'),
  handleValidationErrors,
];

export const validateUpdateCat = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('age').exists({ values: 'falsy' }),
      body('breed').exists({ values: 'falsy' }),
      body('status').exists({ values: 'falsy' }),
    ],
    { message: 'At least one cat field must be provided' },
  ),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('age')
    .optional()
    .isInt({ min: 0, max: 30 })
    .withMessage('Age must be between 0 and 30'),
  body('breed')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Breed must be at least 2 characters'),
  body('status')
    .optional()
    .trim()
    .isIn(['available', 'resting', 'adopted'])
    .withMessage('Status must be available, resting, or adopted'),
  handleValidationErrors,
];
