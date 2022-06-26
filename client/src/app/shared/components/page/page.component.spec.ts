import { ComponentFixture, TestBed } from '@angular/core/testing';
jest.mock('@ngneat/falso', () => ({rand: (values: any[]) => values[0]}))
import { PageComponent } from './page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
