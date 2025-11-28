import 'reflect-metadata';
import { container } from "tsyringe";
import { IUserRepository } from './db/repositories/IUserRepository';
import { UserRepository } from './db/repositories/UserRepository';

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);