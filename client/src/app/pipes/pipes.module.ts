import { NgModule }      from '@angular/core';
import { DollarRatePipe } from './dollar-rate.directive';

@NgModule({
    imports:        [],
    declarations:   [DollarRatePipe],
    exports:        [DollarRatePipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
}
