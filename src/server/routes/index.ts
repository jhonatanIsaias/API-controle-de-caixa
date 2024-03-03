import { Router } from 'express';
import {
  CompanyController,
  validationCompany,
} from '../controllers/CompanyController';
import {
  EntradaController,
  validationEntrada,
} from '../controllers/EntradaController';
import {
  SaidaController,
  validationSaida,
} from '../controllers/SaidaController';
import { validationDescription, validationId } from '../middleware/validation';
import { auth } from '../middleware/JwtToken';

const router = Router();
const companyController = new CompanyController();
const entradaController = new EntradaController();
const saidaController = new SaidaController();

//criando uma nova empresa
router.post('/companies', validationCompany, companyController.createCompany);
//criando uma nova entrada
router.post('/entradas', validationEntrada, entradaController.createEntrada);
//criando uma nova saida
router.post('/saidas', validationSaida, saidaController.createSaida);

router.get(
  '/entradas/:description/:_id',
  auth,
  validationDescription,
  entradaController.findEntradaByDescription,
);

router.get(
  '/entradas/:month/:year/:_id',
  validationId,
  entradaController.findAllEntradaByDate,
);

router.get(
  '/saidas/:description/:_id',
  auth,
  validationDescription,
  saidaController.findSaidaByDescription,
);

router.get(
  '/saidas/:month/:year/:_id',
  validationId,
  saidaController.findAllSaidaByDate,
);

router.delete(
  '/entradas/:_id',
  validationId,
  entradaController.deleteEntradaById,
);

router.delete('/saidas/:_id', validationId, saidaController.deleteSaidaById);

// ATENTICAÇÃO DE USUARIO

router.post('/login', companyController.login);

export { router };
