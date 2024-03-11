import { StateStatus } from './state-status.enum'

export interface StateObject {
  loadStatus: StateStatus
  error?: any
}

export interface StateDataObject<T> extends StateObject {
  data: T | undefined
}
