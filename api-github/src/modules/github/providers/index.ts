import { container } from 'tsyringe';
import IGithubApi from '@modules/github/providers/models/IGithubApi';
import GithubProvider from '@modules/github/providers/implementations/GithubProvider';

container.registerSingleton<IGithubApi>('GithubProvider', GithubProvider);
