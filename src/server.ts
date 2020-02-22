import * as express from 'express';
import * as bodyParser from 'body-parser';
import redisClient from './redisClient';

class Server {
  private client = null;

  async start(callback = () => {}) {
    const app: express.Application = express();
    app.use(bodyParser.json());

    app.post(
      '/getJSON',
      async (req: express.Request, res: express.Response) => {
        try {
          const { key } = req.body;

          return res.status(200).json(await redisClient.getJSON(key));
        } catch (error) {
          return res.status(500).send(error.message);
        }
      }
    );

    app.post(
      '/setJSON',
      async (req: express.Request, res: express.Response) => {
        try {
          const { key, value } = req.body;

          return res.status(202).json(await redisClient.setJSON(key, value));
        } catch (error) {
          return res.status(500).send(error.message);
        }
      }
    );

    app.get('/health', async (req: express.Request, res: express.Response) => {
      res.status(200).send('OK');
    });

    (async () => {
      await redisClient.start(
        /* host */ process.env.ENV_REDIS_HOST,
        /* port */ parseInt(process.env.ENV_REDIS_PORT)
      );
    })();

    this.client = app.listen(process.env.ENV_APP_PORT, (error: Error) => {
      if (error) {
        return process.exit(1);
      }

      callback();

      console.log(
        `Redis microservice listening on port ${process.env.ENV_APP_PORT}!`
      );
    });
  }

  async stop(callback = () => {}) {
    await this.client.close();
    callback();
  }
}

export default new Server();
