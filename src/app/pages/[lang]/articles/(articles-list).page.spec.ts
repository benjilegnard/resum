import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ArticlesListPage } from './(articles-list).page';
import { getTranslocoModule } from '../../../transloco-testing.module';
vi.mock('@analogjs/content', () => ({
  injectContentFiles: vi.fn().mockReturnValue([]),
}));
describe('ArticlesListPage', () => {
  let component: ArticlesListPage;
  let fixture: ComponentFixture<ArticlesListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesListPage, RouterTestingModule, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
