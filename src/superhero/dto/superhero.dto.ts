import {
  IsInt,
  IsString,
  Matches,
  Max,
  Min
} from 'class-validator';

class SuperheroDto {
  id: number;
  @IsString()
  // @IsNotEmpty({ message: 'Name is required.' }) // Not validate against blank string, (" ")
  @Matches(/\S/, { message: 'Name is required.' }) // Validate against both blank and empty string
  readonly name: string;

  @IsString()
  @Matches(/\S/, { message: 'Superpower is required.' })
  readonly superpower: string;

  @IsInt({ message: 'Humility score must be a number.' })
  @Min(1, { message: 'Humility score must be between 1 - 10.' })
  @Max(10, { message: 'Humility score must be between 1 - 10.' })
  readonly humilityScore: number;
}

export default SuperheroDto;
