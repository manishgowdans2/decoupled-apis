import { User } from "../../../domain/entities/User";
import { RegisterDTO } from "../../dto/User/register.dto";

export interface IUserService
{
    register(registerDTO: RegisterDTO): Promise<User>;
}