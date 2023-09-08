import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { tap, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap( console.log ),
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) )
      )
      .subscribe( country => {
        console.log({ country });
        if ( !country) {
          return this.router.navigateByUrl('');
        }

        this.country = country;

        console.log('Tenemos pais');
        return this.country;
      });
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe( ({id}) => {
  //       console.log( { params: id } );

  //       this.countriesService.searchCountryByAlphaCode(id).
  //         subscribe( country => {
  //           console.log({ country });
  //         });
  //     });
  // }
}
