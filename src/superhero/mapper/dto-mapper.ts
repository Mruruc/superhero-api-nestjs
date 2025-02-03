import SuperheroDto from "../dto/superhero.dto";
import { Superhero } from "../entity/superhero.model";

export function toDto(superhero: Superhero): SuperheroDto {
  return {
    id: superhero.id,
    name: superhero.name,
    superpower: superhero.superpower,
    humilityScore: superhero.humilityScore,
  };
}

export function toModel(superHeroDto: SuperheroDto): Superhero {
  return {
    id: superHeroDto.id,
    name: superHeroDto.name,
    superpower: superHeroDto.superpower,
    humilityScore: superHeroDto.humilityScore,
  };
}
