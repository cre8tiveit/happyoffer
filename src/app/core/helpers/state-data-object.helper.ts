import { StateDataObject } from '../types/store/state-data-object.type'
import { StateStatus } from '../types/store/state-status.enum'

export class StateDataObjectHelper {
  public static getStateDataObject<T>(
    data?: Partial<T>,
    status: StateStatus = StateStatus.NotSpecified,
  ): StateDataObject<T> {
    return {
      loadStatus: status,
      data: data as T,
    }
  }
}
