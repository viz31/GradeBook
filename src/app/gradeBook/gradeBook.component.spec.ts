import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeBookComponent } from './gradeBook.component';

describe('GradeBookComponent', () => {
  let component: GradeBookComponent;
  let fixture: ComponentFixture<GradeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeBookComponent ]
    })

  .compileComponents();
  fixture = TestBed.createComponent(GradeBookComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
