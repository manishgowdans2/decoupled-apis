import { injectable } from "tsyringe";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "./IUserRepository";

@injectable()
export class UserRepository implements IUserRepository 
{
    private users: User[] = [];
    
    public async create(user: User): Promise<User>
    {
        //ORM

        return user;
    }

    async findByEmail(email: string): Promise<User | null>
    {
        //ORM

        return null;
    }
}