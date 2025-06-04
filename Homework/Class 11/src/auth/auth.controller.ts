import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginTokenPairDto } from './dto/login-tokens.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({summary: 'Register a new user.'})
  @ApiCreatedResponse({
    description: 'New user has been successfully registered.',
    type: User
  })
  @ApiBadRequestResponse({description: 'Bad request'})
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('/login')
  @ApiOperation({summary: 'Login user'})
  @ApiCreatedResponse({
    description: 'User is successfully logged in',
    type: LoginTokenPairDto
  })
  @ApiBadRequestResponse({description: 'Invalid credentials'})
  @HttpCode(200)
  login(@Body() loginDto: LoginDto): Promise<LoginTokenPairDto> {
    return this.authService.login(loginDto)
  }

  @Post('/refresh')
  @ApiOperation({summary: 'Refresh access and refresh tokens'})
  @ApiOkResponse({
    description: 'Tokens refreshed successfully',
    type: LoginTokenPairDto
  })
  @HttpCode(200)
  refresh(@Body() { refreshToken }: RefreshTokenDto): Promise<LoginTokenPairDto> {
    return this.authService.refresh(refreshToken)
  }
}
