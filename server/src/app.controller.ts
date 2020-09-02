import { Controller, Get, Param } from '@nestjs/common';
import { AccountList } from './models/account-list';
import { AppService } from './app.service';
import { ExchangeAccount } from './models/exchange-account';

@Controller('account')
export class AppController {
  
  constructor(private appService: AppService) {

  }

  @Get('list')
  getList(): AccountList {
    return this.appService.getMockData();
  }

  @Get(':id')
  getAccount(@Param() params): ExchangeAccount {
    const query = this.appService.getMockData(false, true);
    // let res: AccountDetails = { id: params.id };
    const res = query.accounts.find(o => o.id === +params.id);

    return res;
  }

}
