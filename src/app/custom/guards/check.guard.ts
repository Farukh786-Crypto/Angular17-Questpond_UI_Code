import { CanDeactivateFn } from '@angular/router';

export interface ICanDeactivateClass {
  checkCanDeavtivate(): boolean;
}
// check in modelderiven component were we pass this method
export const checkGuard: CanDeactivateFn<ICanDeactivateClass> = (component, currentRoute, currentState, nextState) => {
  return component.checkCanDeavtivate();
};
