/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { injectable, inject } from 'tsyringe';
import IGithubApi from '@modules/github/providers/models/IGithubApi';
import { IListRepositoriesGithubDTO } from '@modules/github/dtos/IListRepositoriesGithubDTO';

@injectable()
export default class ListRepositoriesService {
  constructor(
    @inject('GithubProvider')
    private githubProvider: IGithubApi,
  ) {}

  public async execute(): Promise<IListRepositoriesGithubDTO[] | undefined> {
    const repos = await this.githubProvider.listRepositories();

    return repos;
  }
}
