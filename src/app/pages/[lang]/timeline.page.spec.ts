import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePage } from './timeline.page';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('TimelinePage', () => {
  let component: TimelinePage;
  let fixture: ComponentFixture<TimelinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelinePage, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
