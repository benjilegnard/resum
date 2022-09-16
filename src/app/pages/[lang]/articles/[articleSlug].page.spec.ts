import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePageComponent } from './[articleSlug].page';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MarkdownComponent } from '@analogjs/content';
import { getTranslocoModule } from '../../../transloco-testing.module';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'markdown-content', standalone: true, template: '' })
class FakeMarkdownComponent {}

vi.mock('@analogjs/content', () => ({
  MarkdownComponent: vi.fn(),
  injectContent: vi.fn(),
}));

describe('ArticleComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticlePageComponent,
        RouterTestingModule,
        getTranslocoModule(),
      ],
    })
      .overrideComponent(ArticlePageComponent, {
        remove: { imports: [MarkdownComponent] },
        add: { imports: [FakeMarkdownComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
