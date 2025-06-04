import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        description: 'User email',
        example: 'admin@mail.com'
    })
    email: string;

    @IsStrongPassword()
    @ApiProperty({
        description: 'User password',
        example: '$tr0ngPassword'
    })
    password: string;
}