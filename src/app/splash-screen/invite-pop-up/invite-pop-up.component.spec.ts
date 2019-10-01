import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePopUpComponent } from './invite-pop-up.component';

describe('InvitePopUpComponent', () => {
  let component: InvitePopUpComponent;
  let fixture: ComponentFixture<InvitePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
