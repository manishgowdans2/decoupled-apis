import bcrypt from 'bcrypt';

export class BcryptService
{
    async hash(password: string)
    {
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hashedPassword: string)
    {
        return bcrypt.compare(password, hashedPassword);
    }
}