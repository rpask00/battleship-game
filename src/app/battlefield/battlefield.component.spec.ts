import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatllefieldComponent } from './battlefield.component';

describe('BatllefieldComponent', () => {
  let component: BatllefieldComponent;
  let fixture: ComponentFixture<BatllefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatllefieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatllefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
