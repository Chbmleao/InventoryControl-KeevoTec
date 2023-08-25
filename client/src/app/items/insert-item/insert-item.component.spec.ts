import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertItemComponent } from './insert-item.component';

describe('InsertItemComponent', () => {
  let component: InsertItemComponent;
  let fixture: ComponentFixture<InsertItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertItemComponent]
    });
    fixture = TestBed.createComponent(InsertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
