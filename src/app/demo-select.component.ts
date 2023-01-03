import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectSearchableComponent } from '@chaapaar-select-test/multi-select-searchable';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'chaapaar-select-test-demo-select',
  standalone: true,
  imports: [CommonModule, MultiSelectSearchableComponent, ReactiveFormsModule],
  template: `
    <chaapaar-select-test-multi-select-searchable
      label="Fruits"
      [selectOptions]="selectOptions"
      [formControl]="selectedForm"
      class="m-10 block"
    ></chaapaar-select-test-multi-select-searchable>
  `,
  styles: [],
})
export class DemoSelectComponent {
  selectedForm = new FormControl([]);

  selectOptions = ['Apple', 'Orange', 'Banana'];

  ngOnInit() {
    this.selectedForm.valueChanges.subscribe(console.log);
  }
}
