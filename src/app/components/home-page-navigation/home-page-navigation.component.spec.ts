import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNavigationComponent } from './home-page-navigation.component';

describe('HomePageNavigationComponent', () => {
  let component: HomePageNavigationComponent;
  let fixture: ComponentFixture<HomePageNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
