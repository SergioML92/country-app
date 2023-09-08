import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '', countries: []
    },
    byCountry: {
      term: '', countries: []
    },
    byRegion: {
      region: '', countries: []
    }
  }

  constructor(private http: HttpClient) {
    console.log("CountriesService init");
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage():void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {

    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        // delay(2000),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => {
          console.log(error);

          return of(null);
        })
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {
        term,
        countries
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchCountry(term: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountry = {
        term,
        countries
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  searchRegion(region: Region): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {
        region,
        countries
      }),
      tap(() => this.saveToLocalStorage()),
    );
  }

  // searchCapital(term: string): Observable<Country[]> {

  //   const url = `${this.apiUrl}/capital/${term}`;

  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       catchError(error => {
  //         console.log(error);

  //         return of([]);
  //       })
  //       // tap( countries => console.log('Tap1', countries)),
  //       // map( countries => []),
  //       // tap( countries => console.log('Tap2', countries)),
  //     );
  // }

  // searchCountry(term: string): Observable<Country[]> {

  //   const url = `${this.apiUrl}/name/${term}`;

  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       catchError(error => {
  //         console.log(error);

  //         return of([]);
  //       })
  //     );
  // }

  // searchRegion(region: string): Observable<Country[]> {

  //   const url = `${this.apiUrl}/region/${region}`;

  //   return this.http.get<Country[]>(url)
  //     .pipe(
  //       catchError(error => {
  //         console.log(error);

  //         return of([]);
  //       })
  //     );
  // }
}
