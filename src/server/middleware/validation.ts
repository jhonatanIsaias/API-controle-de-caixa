import { RequestHandler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

type Field = 'body' | 'query' | 'params' | 'header';
type AllValidations = Record<Field, yup.Schema>;
type Ivalidation = (schemas: Partial<AllValidations>) => RequestHandler;

export const validation: Ivalidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};
  const arraySchemas = Object.entries(schemas);

  arraySchemas.forEach((schema) => {
    try {
      schema[1].validateSync(req[schema[0] as Field], {
        abortEarly: false,
      });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const validationErrors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;
        validationErrors[error.path] = error.message;
      });
      errorsResult[schema[0]] = validationErrors;
    }
  });
  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};
export const validationDescription = validation({
  params: yup.object().shape({
    description: yup.string().required(),
    _id: yup.string().required().min(24),
  }),
});
export const validationId = validation({
  params: yup.object().shape({
    _id: yup.string().required().min(24),
  }),
});
