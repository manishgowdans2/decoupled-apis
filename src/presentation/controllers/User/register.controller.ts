import { Request, Response } from "express";
import type { IUserService } from "../../../application/useCases/User/IUserService";
import { container, inject, injectable } from "tsyringe";

export class RegisterController
{
    public async handle(req: Request, res: Response)
    {
        try{
            var userService = container.resolve<IUserService>("UserService");
            const result = await userService.register(req.body);

            var filteredResult =
            {
                id: result.id,
                email: result.email
            }

            return res.status(201).json({success: true, data: filteredResult});
        }
        catch(error){
            return res.status(400).json({success: false, message: (error as Error).message});
        }
    }
}