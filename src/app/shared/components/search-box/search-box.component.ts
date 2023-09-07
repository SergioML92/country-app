import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @ViewChild('txtSearchInput')
  txtSearchInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  emitValue(): void {
    const newTag = this.txtSearchInput.nativeElement.value;
    console.log({newTag});

    if (newTag.length === 0) return;

    this.onValue.emit(newTag);

    this.txtSearchInput.nativeElement.value = '';
  }

}
