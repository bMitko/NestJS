import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from "class-validator";
import { Role } from "src/common/types/role.enum";

export class RegisterDto {
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

    @IsEnum(Role)
    @IsOptional()
    @ApiProperty({
        description: 'User role',
        example: 'Visitor'
    })
    role: Role
}