import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListPageComponent } from './(projects-list).page';

describe('ProjectsComponent', () => {
  let component: ProjectsListPageComponent;
  let fixture: ComponentFixture<ProjectsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
