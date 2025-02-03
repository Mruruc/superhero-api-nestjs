import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { buildLocation } from 'src/util/api-helper.util';
import SuperheroDto from './dto/superhero.dto';
import { SuperheroService } from './superhero.service';
import ParsePositiveIntPipe from './validation/positive-int.pipe';

@Controller('/superheros')
export class SuperheroController {
  constructor(private readonly service: SuperheroService) {}

  @Get()
  getAllSuperheros(@Query('order') order?: string): Promise<SuperheroDto[]> {
    if (order && order.toUpperCase() === 'DESC') {
      return this.service.findAllSuperherosDESC();
    }
    return this.service.findAllSuperheros();
  }

  @Get('/:id')
  getSuperheroById(
    @Param('id', ParsePositiveIntPipe) id: number,
  ): Promise<SuperheroDto> {
    return this.service.findSuperhero(id);
  }

  @Post()
  async createSuperhero(
    @Body(ValidationPipe) superheroDto: SuperheroDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const id = await this.service.saveSuperhero(superheroDto);
    const location = buildLocation(request, id);
    response.status(HttpStatus.CREATED).location(location).end();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSuperhero(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body(ValidationPipe) superheroDto: SuperheroDto,
  ): Promise<void> {
    await this.service.updateSuperhero(id, superheroDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSuperhero(
    @Param('id', ParsePositiveIntPipe) id: number,
  ): Promise<void> {
    await this.service.deleteSuperHero(id);
  }
}
