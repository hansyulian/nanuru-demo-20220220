// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';

export default handler;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const filePath = path.join(`storage/${id}`);
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Length': stat.size,
  });
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}