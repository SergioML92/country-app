import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  public selectedRegion?: Region;
  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor ( private countriesService: CountriesService ) {
  }

  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion( region: Region ): void {
    console.log('Desde ByRegionPage');
    console.log( { term: region } );

    this.isLoading = true;

    this.selectedRegion = region

    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
