import { Injectable, NotFoundException } from '@nestjs/common';
import SuperheroDto from './dto/superhero.dto';
import { toDto, toModel } from './mapper/dto-mapper';
import { SuperheroRepository } from './repository/superhero.repository';

@Injectable()
export class SuperheroService {
  constructor(private readonly repository: SuperheroRepository) {}

  async findAllSuperherosDESC(): Promise<SuperheroDto[]> {
    const heroes = await this.repository.findAll();
    return heroes
      .map((hero) => toDto(hero))
      .sort((a, b) => b.humilityScore - a.humilityScore);
  }

  async findAllSuperheros(): Promise<SuperheroDto[]> {
    const heroes = await this.repository.findAll();
    return heroes.map((hero) => toDto(hero));
  }

  async findSuperhero(id: number): Promise<SuperheroDto> {
    const hero = await this.repository.findById(id);
    if (!hero)
      throw new NotFoundException(`Superhero with id:${id} not found!`);

    return toDto(hero);
  }

  async saveSuperhero(superheroDto: SuperheroDto): Promise<number> {
    const superhero = toModel(superheroDto);
    const createdHero = await this.repository.save(superhero);
    return createdHero.id;
  }

  async updateSuperhero(id: number, dto: SuperheroDto): Promise<void> {
    const superhero = await this.repository.findById(id);
    if (!superhero)
      throw new NotFoundException(`Superhero with id:${id} not found!`);

    superhero.name = dto.name;
    superhero.superpower = dto.superpower;
    superhero.humilityScore = dto.humilityScore;

    await this.repository.update(id, superhero);
  }

  async deleteSuperHero(id: number): Promise<void> {
    await this.findSuperhero(id);
    await this.repository.deleteById(id);
  }
}
