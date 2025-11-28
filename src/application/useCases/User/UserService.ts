import { IUserService } from "./IUserService";
import { Email } from "../../../domain/valueObjects/Email";
import { Password } from "../../../domain/valueObjects/Password";
import { RegisterDTO } from "../../dto/User/register.dto";
import { User } from "../../../domain/entities/User";
import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../../infrastructure/db/repositories/IUserRepository";

@injectable()
export class UserService implements IUserService {
    
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository
    ) { }

    public async register(registerDTO: RegisterDTO): Promise<User> {
        const email = Email.create(registerDTO.email);
        const password = Password.create(registerDTO.password);

        const existingUser = await this.userRepository.findByEmail(registerDTO.email);

        if (!existingUser) throw new Error('User already exists');

        //const hashed = await this.hashService.hash(password.value);

        const user: User =
        {
            id: crypto.randomUUID(),
            firstname: registerDTO.firstname,
            lastname: registerDTO.lastname,
            email: email.value,
            password: password.value
        };

        const createdUser = await this.userRepository.create(user);

        return createdUser;
    }
}