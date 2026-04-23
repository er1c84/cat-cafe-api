import express from 'express';
import {
  createCatHandler,
  deleteCatHandler,
  getAllCatsHandler,
  getCatByIdHandler,
  updateCatHandler,
} from '../controllers/catController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateCatQuery,
  validateCreateCat,
  validateId,
  validateUpdateCat,
} from '../middleware/catValidators.js';

const router = express.Router();

router.get('/', validateCatQuery, getAllCatsHandler);
router.get('/:id', validateId, getCatByIdHandler);
router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  validateCreateCat,
  createCatHandler,
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateId,
  validateUpdateCat,
  updateCatHandler,
);
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateId,
  deleteCatHandler,
);

export default router;
