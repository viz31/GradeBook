import { ComponentFixture, TestBed } from '@angular/core/testing';
import { detailsBlockComponent } from './detailsBlock.component';

describe('detailsBlockComponent', () => {
  let component: detailsBlockComponent;
  let fixture: ComponentFixture<detailsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ detailsBlockComponent ]
    })

    .compileComponents();
    fixture = TestBed.createComponent(detailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
