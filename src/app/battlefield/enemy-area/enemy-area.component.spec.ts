import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyAreaComponent } from './enemy-area.component';

describe('EnemyAreaComponent', () => {
  let component: EnemyAreaComponent;
  let fixture: ComponentFixture<EnemyAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
