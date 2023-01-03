import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ComponentStore } from '@ngrx/component-store';
import { LetModule } from '@ngrx/component';
import { Observable, tap, withLatestFrom } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

interface MultiSelectState {
  selectedItems: unknown[];
  searchTerm: string;
  options: unknown[];
}

@Component({
  selector: 'chaapaar-select-test-multi-select-searchable',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MultiSelectSearchableComponent,
    },
    ComponentStore,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    LetModule,
    NgxMatSelectSearchModule,
  ],
  template: `
    <mat-form-field
      appearance="fill"
      *ngrxLet="{
        selectedItems: selectedItems$,
        filteredOptions: filteredOptions$
      } as vm"
    >
      <mat-label>{{ label }}</mat-label>
      <mat-select
        (valueChange)="updateItems($event)"
        [value]="vm.selectedItems"
        multiple
      >
        <mat-select-trigger>
          <div class="flex flex-wrap gap-2">
            <span
              *ngFor="let item of vm.selectedItems"
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
        <mat-option>
          <ngx-mat-select-search
            placeholderLabel="Search"
            ngModel
            (ngModelChange)="setSearchTerm($event)"
          ></ngx-mat-select-search>
        </mat-option>
        <mat-option
          *ngFor="let option of vm.filteredOptions"
          [value]="option"
          >{{ option }}</mat-option
        >
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
  selectedItems$ = this.componentStore.select((state) => state.selectedItems);

  private searchTerm$ = this.componentStore.select((state) => state.searchTerm);
  private options$ = this.componentStore.select((state) => state.options);

  filteredOptions$ = this.componentStore.select(
    this.options$,
    this.searchTerm$,
    (options, term) =>
      options.filter((option) =>
        (option as string)
          .toLocaleLowerCase()
          .includes(term.toLocaleLowerCase())
      )
  );

  @Input() set selectOptions(options: unknown[]) {
    this.componentStore.patchState({
      options,
    });
  }

  @Input() label = '';

  constructor(private componentStore: ComponentStore<MultiSelectState>) {
    this.componentStore.setState({
      selectedItems: [],
      searchTerm: '',
      options: [],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  updateItems = this.componentStore.effect(
    (trigger$: Observable<unknown[]>) => {
      return trigger$.pipe(
        tap((selectedItems) => {
          this.componentStore.patchState({ selectedItems });
          this.onChange(selectedItems);
          this.onTouched();
        })
      );
    }
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  deleteItem = this.componentStore.effect((trigger$: Observable<unknown>) => {
    return trigger$.pipe(
      withLatestFrom(this.selectedItems$),
      tap(([itemToDelete, selectedItems]) => {
        this.componentStore.patchState({
          selectedItems: [
            ...selectedItems.filter((item) => item !== itemToDelete),
          ],
        });
        this.onChange(selectedItems);
        this.onTouched();
      })
    );
  });

  setSearchTerm(searchTerm: string) {
    this.componentStore.patchState({ searchTerm });
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

  writeValue(value: any): void {
    this.componentStore.patchState({ selectedItems: value });
  }
}
