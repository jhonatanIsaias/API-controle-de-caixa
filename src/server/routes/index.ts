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
import { PlanilhaController } from '../controllers/planilhaController';

const router = Router();
const companyController = new CompanyController();
const entradaController = new EntradaController();
const saidaController = new SaidaController();
const planilhaController = new PlanilhaController();

//criando uma nova empresa
router.post('/companies', validationCompany, companyController.createCompany);
//criando uma nova entrada
router.post(
  '/entradas',
  validationEntrada,
  auth,
  entradaController.createEntrada,
);
//criando uma nova saida
router.post('/saidas', validationSaida, auth, saidaController.createSaida);

router.get(
  '/entradas/:description/:_id',
  auth,
  validationDescription,
  entradaController.findEntradaByDescription,
);

router.get(
  '/entradas/:month/:year/:_id',
  validationId,
  auth,
  entradaController.findAllEntradaByDate,
);
router.get(
  '/entradas-planilha/:month/:year/:_id',
  validationId,
  auth,
  planilhaController.generatespreadsheet,
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
  auth,
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
