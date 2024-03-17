import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Algorithm } from 'jsonwebtoken';
export const generateJWTToken = (company_id: string) => {
  const secret: string = process.env.JWT_SECRET || '';
  const expiresIn = process.env.JWT_EXPIRE;
  const algorithm: Algorithm = 'HS256';

  const token = sign({ subject: company_id }, secret, {
    algorithm: algorithm,
    expiresIn: expiresIn,
  });
  return token;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  const secret: string = process.env.JWT_SECRET || '';
  try {
    if (!auth) {
      throw new Error('JWT is missing');
    }
    const [, token] = auth.split(' ');

    const decoded = verify(token, secret);

    if (decoded) {
      return next();
    }
    throw new Error('JWT invalid');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
