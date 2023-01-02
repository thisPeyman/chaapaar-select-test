import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chaapaar-select-test-multi-select-searchable',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>multi-select-searchable works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectSearchableComponent {}
