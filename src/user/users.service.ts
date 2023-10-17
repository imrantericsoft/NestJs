import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | string> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (user) {
          return user;
        } else {
          return `No user found with ID ${id}.`;
        }
      }
      

    async update(id: number, user: User): Promise<User> {
        await this.usersRepository.update(id, user);
        return this.usersRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<string> {
        const deletedResult = await this.usersRepository.delete(id);
        if (deletedResult.affected === 1) {
            return `User with ID ${id} has been deleted.`;
        } else {
            return `No user found with ID ${id}.`;
        }
    }

}