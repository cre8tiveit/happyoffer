import { Observable } from 'rxjs'
import { StateDataObject } from '../types/store/state-data-object.type'
import { StateStatus } from '../types/store/state-status.enum'

type InspectStatus = <T>(
  defaultData?: T | undefined,
) => (observable: Observable<T>) => Observable<StateDataObject<T>>

// prettier-ignore
export const inspectStatus: InspectStatus = <T>(defaultData?: T | undefined) => (observable: Observable<T>): Observable<StateDataObject<T>> => new Observable(subscriber => {
  subscriber.next({ loadStatus: StateStatus.InProgress, data: defaultData });
  observable.subscribe({
    next: (result: T) => { subscriber.next({ loadStatus: StateStatus.Valid, data: result }); },
    complete: () => { subscriber.complete(); },
    error: error => {
      subscriber.next({ loadStatus: StateStatus.Error, data: defaultData, error });
      subscriber.complete();
    }
  });
});
