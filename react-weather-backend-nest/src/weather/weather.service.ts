import { HttpService, Injectable } from '@nestjs/common';
import appConfig from '../config';
import { secrets } from '../secrets';
import { AxiosRequestConfig } from 'axios';
import * as tunnel from 'tunnel';

@Injectable()
export class WeatherService {
  private requestConfig: AxiosRequestConfig;

  private tunnel = tunnel.httpsOverHttp({
    proxy: {
      host: appConfig.proxyHost,
      port: +appConfig.proxyPort,
    },
  });

  private lastCity: string = 'Arad,IL'

  constructor(private httpService: HttpService) {
    this.requestConfig = appConfig.proxyHost
      ? {
          httpsAgent: this.tunnel,
        }
      : {};
  }

  async getWeather(city? : string): Promise<any> {
    city = this.getAndStoreLastCity(city);
    const url = `${appConfig.weatherUrl}?q=${city}&units=metric&APPID=${secrets.appId}`;
    const result = await this.httpService
      .get(url, this.requestConfig)
      .toPromise();
    return result.data;
  }

  async getForcast(city? : string): Promise<any> {
    city = this.getAndStoreLastCity(city);
    const url = `${appConfig.forecastUrl}?q=${city}&units=metric&APPID=${secrets.appId}`;
    const result = await this.httpService
      .get(url, this.requestConfig)
      .toPromise();
    return result.data;
  }

  private getAndStoreLastCity(city?: string) {
    const actualCity = city ?? this.lastCity;
    this.lastCity = actualCity;
    return actualCity;
  }
}
