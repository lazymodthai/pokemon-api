import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
  private readonly CACHE_TTL = 600;

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: any,
  ) {}

  async getPokemonByName(name: string): Promise<any> {
    const cacheKey = `pokemon:${name.toLowerCase()}`;

    const cachedPokemon = await this.cacheManager.get(cacheKey);
    if (cachedPokemon) {
      return cachedPokemon;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.POKEAPI_BASE_URL}/${name.toLowerCase()}`),
      );

      const pokemonData = {
        name: response.data.name,
        types: response.data.types.map((t) => t.type.name),
        weight: response.data.weight,
        height: response.data.height,
        abilities: response.data.abilities.map((a) => a.ability.name),
      };

      await this.cacheManager.set(cacheKey, pokemonData, {
        ttl: this.CACHE_TTL,
      });

      return pokemonData;
    } catch {
      throw new NotFoundException('Pokemon not found');
    }
  }

  async getPokemonAbilities(name: string): Promise<string[]> {
    const pokemon = await this.getPokemonByName(name);
    return pokemon.abilities;
  }

  async getRandomPokemon(): Promise<any> {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await this.httpService.axiosRef.get(
      `${this.POKEAPI_BASE_URL}/${randomId}`,
    );
    console.log(response);
    return {
      name: response.data.name,
      types: response.data.types.map((t) => t.type.name),
      weight: response.data.weight,
      height: response.data.height,
    };
  }
}
