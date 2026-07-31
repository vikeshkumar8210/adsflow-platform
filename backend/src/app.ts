import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'adsflow-backend' });
});

app.use('/api/v1', routes);
app.use(errorHandler);

export default app;