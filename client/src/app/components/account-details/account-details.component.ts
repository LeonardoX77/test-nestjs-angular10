import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountDetailsService } from './account-details.service';
import { ExchangeAccount } from '../../models/exchange-account';
import { WebSocketService } from '../../services/web-socket.service';
import { RatesService } from '../../services/rates.service';
import { AccountBase } from '../account-base';
import { AccountTransaction } from '../../models/account-transaction';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcountDetailsComponent extends AccountBase implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  account: ExchangeAccount;

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public accountDetailsService: AccountDetailsService,
    private webSocketService: WebSocketService,
    public ratesService: RatesService) {
      super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.subscriptions.add(
            this.accountDetailsService.get(params['id']).subscribe(data => {
              this.init(data);
            },
              error => {
                this.router.navigate(['/not-found'])
              })
          );
        } else {
          this.router.navigate(['/not-found'])
        }
      });
  }

  init(data: ExchangeAccount) {
    this.account = data;

    this.subscriptions.add(
      this.webSocketService
        .getDollarRate()
        .subscribe((rate: number) => {
          this.ratesService.setRate(rate)
          //this force refresh the whole table
          this.account = JSON.parse(JSON.stringify(this.account));
          this.ref.markForCheck();
        },
        error => {
          throw error;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getBgColor(trans: AccountTransaction) {
    if (this.ratesService.dollarRateOld) {
      const val = trans.balance * this.ratesService.dollarRate;
      const valOld = trans.balance * this.ratesService.dollarRateOld;
      return this.calculateBgColor(val, valOld);
    }
    return null;
  }

}
