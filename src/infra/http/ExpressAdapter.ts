import express, { Express, Request, Response } from 'express';
import Http from './Http';

export default class ExpressAdapter implements Http {
  app: Express;

  constructor() {
    this.app = express();
  }

  listen(port: number): void {
    this.app.listen(port, () => console.log(`App is runing on port ${3000}`));
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method as keyof Express](
      url,
      async (req: Request, res: Response) => {
        const output = await callback(req.params, req.body);
        res.json(output);
      },
    );
  }
}
