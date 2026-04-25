import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatedPage } from './rated.page';

describe('RatedPage', () => {
  let component: RatedPage;
  let fixture: ComponentFixture<RatedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
