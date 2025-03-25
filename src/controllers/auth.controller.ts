import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthCredentialsDto, AuthResponseDto } from '../dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() credentials: AuthCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.register(credentials.email, credentials.password);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() credentials: AuthCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.login(credentials.email, credentials.password);
  }
}