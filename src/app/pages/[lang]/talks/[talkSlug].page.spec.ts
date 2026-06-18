import { MarkdownComponent } from '@analogjs/content';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { getTranslocoModule } from '../../../transloco-testing.module';
import { TalkPageComponent } from './[talkSlug].page';

@Component({ selector: 'analog-markdown', template: '' })
class FakeMarkdownComponent {}

vi.mock('@analogjs/content', () => ({
  MarkdownComponent: vi.fn(),
  injectContent: vi.fn(),
}));

describe('TalkPageComponent', () => {
  let component: TalkPageComponent;
  let fixture: ComponentFixture<TalkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalkPageComponent, RouterTestingModule, getTranslocoModule()],
    })
      .overrideComponent(TalkPageComponent, {
        remove: { imports: [MarkdownComponent] },
        add: { imports: [FakeMarkdownComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TalkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
