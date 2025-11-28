export class Password
{
    private constructor(public readonly value: string) {}

    static create (password: string): Password
    {
        if(password.length < 4)
        {
            throw new Error('Password must be at least 4 characters long');
        }

        return new Password(password);
    }
}