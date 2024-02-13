import { Router } from 'express';
import {
  CompanyController,
  validationCompany,
} from '../controllers/CompanyController';

const router = Router();
const companyController = new CompanyController();

//criando uma nova empresa
router.post('/companies', validationCompany, companyController.createCompany);

export { router };
