export enum OrderCodeEnum {
  SETTLEMENT = 1,
  ON_RAMP = 2,
  DEPOSIT = 3
}

export enum TransactionTypeEnum {
  TRANSFER_IN = 1,
  TRANSFER_OUT = 2
}

export class AccountTransaction {
  id: string;
  date: Date;
  code: OrderCodeEnum;
  type: TransactionTypeEnum;
  debit: number;
  credit: number;
  balance: number;
}
