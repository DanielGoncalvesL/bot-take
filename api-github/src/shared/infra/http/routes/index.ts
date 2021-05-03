import { Router } from 'express';

import githubRouter from '@modules/github/infra/http/routes/github.routes';

const routes = Router();

routes.use('/repos', githubRouter);

export default routes;
