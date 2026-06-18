import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoModule } from '../../../transloco-testing.module';
import { TalksPageComponent } from './(talks-list).page';

vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn().mockReturnValue([]),
}));

describe('TalksPageComponent', () => {
  let component: TalksPageComponent;
  let fixture: ComponentFixture<TalksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalksPageComponent, RouterTestingModule, getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TalksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
