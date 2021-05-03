import { IListRepositoriesGithubDTO } from '@modules/github/dtos/IListRepositoriesGithubDTO';

export default interface IGithubApi {
  listRepositories(): Promise<IListRepositoriesGithubDTO[]>;
}
