import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'chaapaar-select-test-multi-select-searchable',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectSearchableComponent,
    },
  ],
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ placeholder }}</mat-label>
      <mat-select
        (valueChange)="selectItem($event)"
        [value]="selectedItems"
        multiple
      >
        <mat-select-trigger>
          <div class="flex flex-wrap gap-2">
            <span
              *ngFor="let item of selectedItems"
              class=" px-3 rounded-md bg-gray-300 text-gray-800 flex items-center gap-1"
            >
              <p class="no-margin">{{ item }}</p>
              <button
                (click)="$event.stopPropagation(); deleteItem(item)"
                class="rounded-full bg-gray-600 text-gray-50 w-4 h-4 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          </div>
        </mat-select-trigger>
        <mat-option *ngFor="let option of selectOptions" [value]="option">{{
          option
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      .no-margin {
        margin: 0 !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectSearchableComponent implements ControlValueAccessor {
  selectedItems: unknown[] = [1, 2, 3, 4];

  @Input() selectOptions: unknown[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @Input() placeholder = 'numbers';

  log = (a: unknown) => console.log(a);

  selectItem(value: unknown[]) {
    this.selectedItems = value;
    this.onChange(this.selectedItems);
    this.onTouched();
  }

  deleteItem(value: unknown) {
    this.selectedItems = this.selectedItems.filter((item) => item !== value);
    this.onChange(this.selectedItems);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: unknown) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedItems = obj;
  }
}
