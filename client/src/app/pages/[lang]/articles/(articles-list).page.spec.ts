import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticlesPageComponent } from './(articles-list).page';
import { getTranslocoModule } from '../../../transloco-testing.module';
vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn().mockReturnValue([]),
}));
describe('ArticlesComponent', () => {
  let component: ArticlesPageComponent;
  let fixture: ComponentFixture<ArticlesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticlesPageComponent,
        RouterTestingModule,
        getTranslocoModule(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
