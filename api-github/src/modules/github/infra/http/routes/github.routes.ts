import { Router } from 'express';
import GithubController from '@modules/github/infra/http/controllers/GithubController';

const githubRouter = Router();
const githubController = new GithubController();

githubRouter.get('/', githubController.index);

export default githubRouter;
