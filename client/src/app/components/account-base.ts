import { Component } from "@angular/core";

/**
 * This is an abstract base class (cannot be instatiated, only extended by derived classes) which demostrates
 * inheritance and code reusing.
 * I decided to use a base class for 2 reasons:
 *    1- In an abstract class we can declare some abstract methods that MUST be implemented in derived classes.
 *    2- In a base class we can declare some common methods that all derived classes are able to use (this approach
 *      could also be implemented as service/s)
 */
@Component({
  template: ''
})
export abstract class AccountBase {
  /**
   * This will force derived classes to implement this method, which reminds developer that they has to implement
   * Angular OnDestroy interface :)
   */
  abstract ngOnDestroy(): void;

  protected calculateBgColor(val: number, valOld: number) {
    if (val < valOld) {
      return { 'red': true };
    } else if (val > valOld) {
      return { 'green': true };
    }

    return null;
  }

}
