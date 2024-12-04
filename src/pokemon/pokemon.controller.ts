import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:name')
  async getPokemon(@Param('name') name: string) {
    if (name === 'random') return this.pokemonService.getRandomPokemon();
    return this.pokemonService.getPokemonByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name/ability')
  async getPokemonAbilities(@Param('name') name: string) {
    return this.pokemonService.getPokemonAbilities(name);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/random')
  async getRandomPokemon() {
    return this.pokemonService.getRandomPokemon();
  }
}
