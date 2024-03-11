import { StateObject, StateStatus } from '@jex/ngx-jex-framework';

export class StateStatusHelper {
  public static pairwiseToBoolean(
    assertPrevious = StateStatus.InProgress,
    assertCurrent = StateStatus.Valid
  ): (input: [StateStatus, StateStatus]) => boolean {
    return ([previous, current]) =>
      previous === assertPrevious && current === assertCurrent;
  }

  public static pairwiseToBooleanObject(
    assertPrevious = StateStatus.InProgress,
    assertCurrent = StateStatus.Valid
  ): (input: [StateObject, StateObject]) => boolean {
    return ([previous, current]) =>
      previous.loadStatus === assertPrevious &&
      current.loadStatus === assertCurrent;
  }
}
