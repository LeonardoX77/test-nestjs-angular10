import { ExchangeAccount } from "./exchange-account";

export class AccountTransaction {
  id: string;
  date: Date;
  code: string;
  type: string;
  debit: number;
  credit: number;
  balance: number;
}
