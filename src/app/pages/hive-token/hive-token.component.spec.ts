import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveTokenComponent } from './hive-token.component';

describe('HiveTokenComponent', () => {
  let component: HiveTokenComponent;
  let fixture: ComponentFixture<HiveTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiveTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
