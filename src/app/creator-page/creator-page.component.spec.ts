import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatorPageComponent } from './creator-page.component';

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorPageComponent]
    });
    fixture = TestBed.createComponent(CreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
