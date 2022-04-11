import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { Hero } from './hero.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateHero } from './hero.interface';

@Controller('/heroes')
export class HeroController {
  constructor(
    private readonly heroService: HeroService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkLoggedIn(request: Request): Promise<void> {
    try {
      const cookie = request.cookies['token'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException('Unauthorized.');
    } catch {
      throw new UnauthorizedException('Unauthorized.');
    }
  }

  @Post('/')
  async addHero(
    @Req() request: Request,
    @Body() user: CreateHero,
  ): Promise<Hero> {
    await this.checkLoggedIn(request);

    return this.heroService.create(user);
  }
  @Delete('/:id')
  async deleteUser(
    @Req() request: Request,
    @Param('id') id: number,
  ): Promise<void> {
    await this.checkLoggedIn(request);

    await this.heroService.deleteById(id);
  }

  @Get('/')
  async getAllHeroes(@Req() request: Request): Promise<Hero[]> {
    await this.checkLoggedIn(request);

    return this.heroService.findAll();
  }
}
