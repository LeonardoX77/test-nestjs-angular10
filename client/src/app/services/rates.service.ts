import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class RatesService {
  dollarRate: number;
  dollarRateOld: number;
  lastUpdate: Date;

  setRate(rate: number) {
    this.dollarRateOld = this.dollarRate;
    this.dollarRate = rate;
    this.lastUpdate = new Date();
  }
}
