import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginTokenPairDto } from './dto/login-tokens.dto';
import { JwtPayload } from 'src/common/types/jwt-payload';
import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from 'src/common/consts/token.consts';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findByEmail(registerDto.email)

        if (existingUser) {
            throw new BadRequestException('This email already exists');
        }

        const newUser = this.userRepository.create(registerDto)

        return this.userRepository.save(newUser)
    }

    async login({ email, password }) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const arePassworsMatching = await user.comparePasswords(password)

        if (!arePassworsMatching) {
            throw new UnauthorizedException('Invalid credentials.')
        }

        const { accessToken, refreshToken } = await this.#generateTokens(user)

        await this.userRepository.update(user.id, { refreshToken });

        return { accessToken, refreshToken }
    }

    async refresh(token: string): Promise<LoginTokenPairDto> {
        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(
                token,
                { secret: this.configService.get('JWT_REFRESH_SECRET') }
            )

            const user = await this.userRepository.findByEmail(payload.email)

            if (!user || user.refreshToken !== token) {
                throw new UnauthorizedException('Invalid refresh token')
            }

            const { accessToken, refreshToken } = await this.#generateTokens(user);

            await this.userRepository.update(user.id, { refreshToken });

            return { accessToken, refreshToken }
        }
        catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async #generateTokens(user: User): Promise<LoginTokenPairDto> {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        } satisfies JwtPayload;

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: ACCESS_TOKEN_EXPIRATION_TIME
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: REFRESH_TOKEN_EXPIRATION_TIME
            })
        ]);

        return { accessToken, refreshToken }
    }
}
