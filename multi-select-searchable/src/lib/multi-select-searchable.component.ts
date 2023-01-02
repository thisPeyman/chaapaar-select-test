import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chaapaar-select-test-multi-select-searchable',
  standalone: true,
  imports: [CommonModule],
  template: ` <h1 class="text-4xl font-bold underline">Hello world!!</h1> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectSearchableComponent {}
