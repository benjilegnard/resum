import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePageComponent } from './timeline.page';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('TimelinePageComponent', () => {
  let component: TimelinePageComponent;
  let fixture: ComponentFixture<TimelinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinePageComponent, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
