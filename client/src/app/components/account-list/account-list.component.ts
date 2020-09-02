import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountList } from '../../models/account-list';
import { ExchangeAccount } from '../../models/exchange-account';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';
import { AccountBase } from '../account-base';
import { AccountService } from './account-list.service';
import { RatesService } from '../../services/rates.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AcountListComponent extends AccountBase implements OnInit, OnDestroy {
  accountList: AccountList;
  accountListPrevious: AccountList;
  // accountList$ = this.accountService.getList(); //to be used with async pipe
  subscriptions: Subscription = new Subscription();

  constructor(
    public accountService: AccountService,
    private webSocketService: WebSocketService,
    public ratesService: RatesService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.getList().subscribe(data => this.accountList = data)
    );

    this.webSocketService
      .getDollarRate()
      .subscribe((rate: number) => {
        /*
        This will refresh the observable and it will force the async pipe to render the data again in the view.
        The rate is set within tap() operator, after the combineLatest operation is finished.
        NOTE: THIS APPROACH WAS WORKING UNTIL RANDOM BTC PRICE IMPLEMENTATION
        */
        //
        // this.accountList$ = combineLatest([this.accountList$, of(null)])
        //   .pipe(
        //     map(([accList, fake]) => (accList)), //this basically returns the same observable value in a new observable
        //     tap(() => this.accountService.setRate(rate))
        //   );

        this.ratesService.setRate(rate)
        this.accountListPrevious = JSON.parse(JSON.stringify(this.accountList)); //make a copy (not reference)
        this.accountList.dollarRate = rate;
        //this force refresh the whole table
        this.accountList = JSON.parse(JSON.stringify(this.accountList));
      },
      error => {
        throw error;
      });

    this.webSocketService
      .getListWithRandomBTC()
      .subscribe((accountList: AccountList) => {
        /*
        This will refresh the observable and it will force the async pipe to render the data again in the view.
        The rate is set within tap() operator, after the combineLatest operation is finished.
        NOTE: THIS APPROACH WAS WORKING UNTIL RANDOM BTC PRICE IMPLEMENTATION
        */
        // this.accountList$ = of(accountList);

        this.accountListPrevious = JSON.parse(JSON.stringify(this.accountList)); //make a copy (not reference)
        this.accountList = accountList;
      },
      error => {
        throw error;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getBgColor(account: ExchangeAccount) {
    if (this.accountListPrevious && this.accountListPrevious.accounts) {
      const prevValue = this.accountListPrevious.accounts.find(o => o.id === account.id);

      if (prevValue) {
        const val = account.balance * this.ratesService.dollarRate;
        const valOld = prevValue.balance * this.accountListPrevious.dollarRate;

        return this.calculateBgColor(val, valOld);
      }
    }

    return null;
  }
}
