import 'reflect-metadata';
import { container } from "tsyringe";
import { IUserService } from "../application/useCases/User/IUserService";
import { UserService } from "../application/useCases/User/UserService";

container.registerSingleton<IUserService>(
    "UserService",
     UserService
);