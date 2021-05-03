/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListRepositoriesService from '@modules/github/services/ListRepositoriesService';

export default class GithubController {
  public async index(_: Request, response: Response): Promise<Response> {
    const githubController = container.resolve(ListRepositoriesService);

    const repos = await githubController.execute();

    return response.json(repos);
  }
}
