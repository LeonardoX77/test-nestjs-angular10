import { AccountTransaction } from "./account-transaction";

export class ExchangeAccount {
  id: number;
  name: string;
  category: string;
  tag: string;
  balance: number;
  availableBalance: number;
  transactions: AccountTransaction[];
}
