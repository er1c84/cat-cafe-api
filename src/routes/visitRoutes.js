import express from 'express';
import {
  createVisitHandler,
  deleteVisitHandler,
  getAllVisitsHandler,
  getVisitByIdHandler,
  updateVisitHandler,
} from '../controllers/visitController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateCreateVisit,
  validateId,
  validateUpdateVisit,
  validateVisitQuery,
} from '../middleware/visitValidators.js';

const router = express.Router();

router.use(authenticate, authorizeRoles('ADMIN'));

router.get('/', validateVisitQuery, getAllVisitsHandler);
router.get('/:id', validateId, getVisitByIdHandler);
router.post('/', validateCreateVisit, createVisitHandler);
router.put('/:id', validateId, validateUpdateVisit, updateVisitHandler);
router.delete('/:id', validateId, deleteVisitHandler);

export default router;
