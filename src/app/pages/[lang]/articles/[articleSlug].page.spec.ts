import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePage } from './[articleSlug].page';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { MarkdownComponent } from '@analogjs/content';
import { getTranslocoModule } from '../../../transloco-testing.module';

// we want to mock external component, so it's ok
// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'markdown-content', standalone: true, template: '' })
class FakeMarkdownComponent {}

vi.mock('@analogjs/content', () => ({
  MarkdownComponent: vi.fn(),
  injectContent: vi.fn(),
}));

describe('ArticlePage', () => {
  let component: ArticlePage;
  let fixture: ComponentFixture<ArticlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePage, RouterTestingModule, getTranslocoModule()],
    })
      .overrideComponent(ArticlePage, {
        remove: { imports: [MarkdownComponent] },
        add: { imports: [FakeMarkdownComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
