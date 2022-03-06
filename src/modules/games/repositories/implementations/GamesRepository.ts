import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
    .createQueryBuilder() // Complete usando query builder
    .where('title ILIKE :param', { param: `%${param}%` })
    .getMany();

    return games;

  }

  async countAllGames(): Promise<[{ count: string }]> {
    const games = await this.repository.query('SELECT COUNT(*) FROM games'); // Complete usando raw query
    return games;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      // Complete usando query builder
  }
}
