import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../../../../core/types/types';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent {
  @Input() offer: Offer;
}
