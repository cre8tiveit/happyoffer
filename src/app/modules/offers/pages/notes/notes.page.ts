import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OfferState } from 'src/app/core/stores/offer/offer.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Note, Offer } from 'src/app/core/types/types';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
})
export class NotesPage implements OnInit {
  @Select(OfferState.notes) public readonly notes$: Observable<
    StateDataObject<Note[]>
  >;

  public notes: Note[] = [];
  public filteredNotes: Note[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.notes$.subscribe((notes) => {
      this.notes = notes.data as Note[];
    });
  }

  delete(id: number): void {}
}
