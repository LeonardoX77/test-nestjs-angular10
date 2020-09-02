import { PipeTransform, Pipe } from "@angular/core";
import { RatesService } from "../services/rates.service";


@Pipe({
  name: 'dollarRate',
  pure: true
})
export class DollarRatePipe implements PipeTransform {

  constructor(private ratesService: RatesService) {}

  transform(value: any): any {
    let res = 0;
    if (value && value > 0 && this.ratesService.dollarRate) {
      res = value * this.ratesService.dollarRate;
    };
    return res;
  }

}

