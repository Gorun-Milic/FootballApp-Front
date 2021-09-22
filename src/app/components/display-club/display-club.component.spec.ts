import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClubComponent } from './display-club.component';

describe('DisplayClubComponent', () => {
  let component: DisplayClubComponent;
  let fixture: ComponentFixture<DisplayClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
