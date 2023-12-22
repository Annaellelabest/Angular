import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatorDetailComponent } from './creator-detail.component';

describe('CreatorDetailComponent', () => {
  let component: CreatorDetailComponent;
  let fixture: ComponentFixture<CreatorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorDetailComponent]
    });
    fixture = TestBed.createComponent(CreatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
