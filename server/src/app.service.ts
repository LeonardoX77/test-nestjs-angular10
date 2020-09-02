import { Injectable } from '@nestjs/common';
import { AccountList } from './models/account-list';
import { ExchangeAccount } from './models/exchange-account';
import { AccountTransaction } from './models/account-transaction';

@Injectable()
export class AppService {
  
  getMockData(randomBTC = false, includeTransactions = false): AccountList {
    const accounts: ExchangeAccount[] = [];
    for (let index = 0; index <= 15; index++) {
      let balance = index * 0.1;
      let availableBalance = index * 2;

      if (randomBTC) {
        balance = this.getRandom(1, 5) * 0.1;
        availableBalance = this.getRandom(1, 5) * 2;
      }

      accounts.push(
        {
          id: index,
          name: `ACCOUNT ${index}`,
          category: `CAT${this.getRandom(1, 5)}`,
          tag: `TAG${this.getRandom(1, 3)}`,
          balance: balance,
          availableBalance: availableBalance,
          transactions: includeTransactions ? this.getTransactions() : null
        }
      );
    }

    return {
      accounts: accounts,
      dollarRate: 9500 //1BTC = $9500 <<-- default price
    };
  }

  getTransactions(): AccountTransaction[] {
    const numTrans = this.getRandom(2, 10);
    const trans: AccountTransaction[] = [];

    for (let index = 0; index < numTrans; index++) {
      /**
       * trying to generate a kind of GUID value as it would come from database, I could use a library like 
       * https://github.com/uuidjs/uuid, but for simplicity I decided to mock it as follows:
       */
      const date = new Date();
      const time = date.getTime().toString();
      const uuid = time.substr(time.length - 8, 8);

      const orderCode = this.getRandom(1, 3);
      const transactionType = this.getRandom(1, 2);

      trans.push(
        {
          id: uuid,
          date: date,
          code: orderCode,
          type: transactionType,
          debit: index * 0.1,
          credit: index * 0.2,
          balance: index * 2
        }
      );
    }

    return trans;
  }

  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}