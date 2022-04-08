import { Injectable, Inject } from '@nestjs/common';
import { Hero } from './hero.entity';
import { CreateHero } from './hero.interface';

@Injectable()
export class HeroService {
  constructor(
    @Inject('HERO_REPOSITORY')
    private heroRepository: typeof Hero,
  ) {}
  
  async create(hero: CreateHero): Promise<Hero> {
    return this.heroRepository.create<Hero>({
      id: hero.id,
      name: hero.name,
      shortDescription: hero.shortDescription,
      description: hero.shortDescription,
      power: hero.power
    });
  }
  
  async findAll(): Promise<Hero[]> {
    return this.heroRepository.findAll<Hero>();
  }
}
