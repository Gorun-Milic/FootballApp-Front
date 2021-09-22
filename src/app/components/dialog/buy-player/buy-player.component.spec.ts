import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPlayerComponent } from './buy-player.component';

describe('BuyPlayerComponent', () => {
  let component: BuyPlayerComponent;
  let fixture: ComponentFixture<BuyPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
