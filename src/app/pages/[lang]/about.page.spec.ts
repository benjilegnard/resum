import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPage } from './about.page';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
