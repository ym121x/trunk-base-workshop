import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private lastCity: string = 'Arad,IL';

  setLastCity(city: string) {
    this.lastCity = city;
  }

  getLastCity() {
    return this.lastCity;
  }
}