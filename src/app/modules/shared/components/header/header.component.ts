import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  public showHomeButton: boolean = false;

  constructor(private router: Router) {}

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
