import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectSearchableComponent } from '@chaapaar-select-test/multi-select-searchable';

@Component({
  selector: 'chaapaar-select-test-demo-select',
  standalone: true,
  imports: [CommonModule, MultiSelectSearchableComponent],
  template: `
    <chaapaar-select-test-multi-select-searchable></chaapaar-select-test-multi-select-searchable>
  `,
  styles: [],
})
export class DemoSelectComponent {}
