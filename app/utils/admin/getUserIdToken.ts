import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!req.headers['authorization']) reject();
    resolve(<string>req.headers['authorization']);
  });
};
