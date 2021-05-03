import IGithubApi from '@modules/github/providers/models/IGithubApi';
import api from '@modules/github/providers/utils';
import { IListRepositoriesGithubDTO } from '@modules/github/dtos/IListRepositoriesGithubDTO';

export default class GithubProvider implements IGithubApi {
  // eslint-disable-next-line class-methods-use-this
  public async listRepositories(): Promise<IListRepositoriesGithubDTO[]> {
    const repositories = await api
      .get<IListRepositoriesGithubDTO[]>('/orgs/takenet/repos')
      .then(response => {
        const repos = response.data
          .filter(repo => repo.language === 'C#')
          .sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .slice(0, 5);
        return repos;
      });

    return repositories;
  }
}
