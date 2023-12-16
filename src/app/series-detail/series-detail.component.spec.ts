import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDetailComponent } from './series-detail.component';

describe('SeriesDetailComponent', () => {
  let component: SeriesDetailComponent;
  let fixture: ComponentFixture<SeriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesDetailComponent]
    });
    fixture = TestBed.createComponent(SeriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
