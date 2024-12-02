import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FilmResponse, Result } from '../models/Film';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private url = 'https://api.themoviedb.org';

  constructor(private http: HttpClient) { }

  async getFilms(page: number): Promise<Result[]> {

    const url = `${this.url}/3/movie/popular`;
    const res: FilmResponse = await lastValueFrom(this.http.get<FilmResponse>(url, { params: this.getParams() }));

    return res.results.map((result) => new Result(result));
  }

  async getFilmById(id: number): Promise<Result> {
    const url = `${this.url}/3/movie/${id}`;
    const res: Result = await lastValueFrom(this.http.get<Result>(url, { params: this.getParams() }));
    return new Result(res);
  }

  async getSimilarFilmsById(id: number): Promise<Result[]> {

    const url = `${this.url}/3/movie/${id}/similar`;
    const res: FilmResponse = await lastValueFrom(this.http.get<FilmResponse>(url, { params: this.getParams() }));
    return res.results.map((result) => new Result(result));
  }

  getParams(page: number = 1): HttpParams {
    return new HttpParams().set('api_key', environment.apiKey).set('language', 'es-ES').set('page', page);
  }

}
