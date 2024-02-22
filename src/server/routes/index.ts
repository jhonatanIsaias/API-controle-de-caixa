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
  entradaController.findEntradaByDescription,
);

router.get(
  '/entradas/:month/:year/:_id',
  entradaController.findAllEntradaByDate,
);

router.get('/saidas/:description/:_id', saidaController.findSaidaByDescription);

router.get('/saidas/:month/:year/:_id', saidaController.findAllSaidaByDate);

router.delete('/entradas/:_id', entradaController.deleteEntradaById);

router.delete('/saidas/:_id', saidaController.deleteSaidaById);

export { router };
