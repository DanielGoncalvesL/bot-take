export interface IListRepositoriesGithubDTO {
  name: string;
  description: string;
  language: string;
  created_at: string;
  owner: {
    avatar_url: string;
  };
}

export interface Josiney{
  data: IListRepositoriesGithubDTO[];
}


