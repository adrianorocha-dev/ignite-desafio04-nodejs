import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: { id: user_id },
      relations: ['games'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = this.repository.query('SELECT * FROM users ORDER BY first_name;'); // Complete usando raw query
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(); // Complete usando raw query
  }
}
