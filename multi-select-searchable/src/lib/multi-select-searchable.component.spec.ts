import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectSearchableComponent } from './multi-select-searchable.component';

describe('MultiSelectSearchableComponent', () => {
  let component: MultiSelectSearchableComponent;
  let fixture: ComponentFixture<MultiSelectSearchableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectSearchableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectSearchableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
