import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent {
  @Input()
  public title = '';
}
