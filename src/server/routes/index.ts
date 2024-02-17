import { Router } from 'express';
import {
  CompanyController,
  validationCompany,
} from '../controllers/CompanyController';
import {
  EntradaController,
  validationEntrada,
} from '../controllers/EntradaController';

const router = Router();
const companyController = new CompanyController();
const entradaController = new EntradaController();
//criando uma nova empresa
router.post('/companies', validationCompany, companyController.createCompany);
//criando uma nova entrada
router.post('/entradas', validationEntrada, entradaController.createEntrada);

export { router };
