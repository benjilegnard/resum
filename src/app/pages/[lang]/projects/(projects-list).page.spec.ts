import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListPage } from './(projects-list).page';

import { getTranslocoModule } from '../../../transloco-testing.module';

describe('ProjectsListPage', () => {
  let component: ProjectsListPage;
  let fixture: ComponentFixture<ProjectsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListPage, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
