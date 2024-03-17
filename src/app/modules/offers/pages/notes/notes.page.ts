import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
})
export class NotesPage {
  constructor(private router: Router) {}

  public goHome(): void {
    this.router.navigate(['/home']);
  }
}
