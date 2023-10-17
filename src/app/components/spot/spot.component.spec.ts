import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDetailsComponent } from './spot.component';

describe('SpotDetailsComponent', () => {
  let component: SpotDetailsComponent;
  let fixture: ComponentFixture<SpotDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotDetailsComponent]
    });
    fixture = TestBed.createComponent(SpotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
