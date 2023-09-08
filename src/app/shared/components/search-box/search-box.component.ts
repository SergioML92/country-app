import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @ViewChild('txtSearchInput')
  txtSearchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300),
      )
      .subscribe(value => {
        console.log('debouncer value', value);

        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    console.log('Destruido');
    this.debouncerSuscription?.unsubscribe();
  }


  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  // emitValue(): void {
  //   const newTag = this.txtSearchInput.nativeElement.value;
  //   console.log({ newTag });

  //   if (newTag.length === 0) return;

  //   this.onValue.emit(newTag);

  //   this.txtSearchInput.nativeElement.value = '';
  // }
}
