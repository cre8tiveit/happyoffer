import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddNote,
  DeleteNote,
  GetNotes,
} from 'src/app/core/stores/offer/offer.actions';
import { OfferState } from 'src/app/core/stores/offer/offer.state';
import { StateDataObject } from 'src/app/core/types/store/state-data-object.type';
import { Note, PostNote } from 'src/app/core/types/types';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
})
export class NotesPage implements OnInit {
  @Select(OfferState.notes) public readonly notes$: Observable<
    StateDataObject<Note[]>
  >;

  public note = '';
  public notes: Note[] = [];
  public toastMessage = '';
  public filteredNotes: Note[] = [];
  private offerId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private sanitizer: DomSanitizer,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.offerId = params['id'];
    });
    this.notes$.subscribe((notes) => {
      this.notes = notes.data as Note[];
      if (this.notes) {
        this.notes = this.notes.map((note) => {
          const sanitizedNote = {
            ...note,
            safeMessage: this.sanitizer.bypassSecurityTrustHtml(note.message),
          };
          return sanitizedNote;
        });
      }
    });
  }

  delete(id: number): void {
    this.store.dispatch(new DeleteNote(id));
  }

  async addNote() {
    const postNote: PostNote = {
      is_push_notification: false,
      type: 'note',
      message: this.note,
      is_deleted_app: false,
      offer_id: this.offerId,
    };
    const toast = await this.toastController.create({
      message: 'Note successfully added',
      duration: 5000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
    this.note = '';
    this.store.dispatch(new AddNote(postNote));
    this.store.dispatch(new GetNotes('' + this.offerId));
  }
}
