import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bl-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
