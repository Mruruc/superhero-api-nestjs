import { Injectable } from '@nestjs/common';
import superheroes from '../data/sample-superhero-data';
import { Superhero } from '../entity/superhero.model';

@Injectable()
export class SuperheroRepository {
  private readonly heroes: Superhero[] = superheroes;

  async findAll(): Promise<Superhero[]> {
    return this.heroes;
  }

  async findById(id: number): Promise<Superhero | undefined> {
    return this.heroes.find((hero) => hero.id === id);
  }

  async save(newHero: Superhero): Promise<Superhero> {
    this.heroes.push(newHero);
    return newHero;
  }

  async update(id: number, updatedHero: Superhero): Promise<Superhero> {
    const index = this.heroes.findIndex((hero) => hero.id === id);
    this.heroes[index] = updatedHero;
    return this.heroes[index];
  }

  async deleteById(id: number): Promise<void> {
    const index = this.heroes.findIndex((hero) => hero.id === id);
    this.heroes.splice(index, 1);
  }
}
