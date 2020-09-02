import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppGateway } from 'src/app.gateway';
import { AppService } from 'src/app.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private static dollarRateCounter = 0;
  private static BTCPriceCounter = 0;

  private readonly dollarRateTaskInterval = 15;
  private BTCPriceTaskInterval = 30; //default value

  constructor(
    private appGateway: AppGateway, 
    private appService: AppService) {
  }
  
  @Cron('* * * * * *')
  handleCronForDollarRate() {
    
    if (TasksService.dollarRateCounter + 1 >= this.dollarRateTaskInterval) {
      this.logger.debug('SOCKET DOLLAR RATE CALLED!!');
      const rate = this.appService.getRandom(9000, 10000);
      this.appGateway.server.emit('msgDollarRate', rate);
      TasksService.dollarRateCounter = 0;

    } else {
      this.logger.debug('dollar rate waiting: ' + TasksService.dollarRateCounter );
      TasksService.dollarRateCounter++;
    }
  }

  @Cron('* * * * * *')
  handleCronForBTCRows() {
    
    if (TasksService.BTCPriceCounter + 1 >= this.BTCPriceTaskInterval) {
      this.logger.debug('SOCKET BTC PRICE CALLED!!');

      //set new random interval
      this.BTCPriceTaskInterval = this.appService.getRandom(1, 60);

      this.appGateway.server.emit('msgBTCPriceChanged', this.appService.getMockData(true));
      TasksService.BTCPriceCounter = 0;

    } else {
      this.logger.debug(`BTC price waiting: ${TasksService.BTCPriceCounter} until ${this.BTCPriceTaskInterval}`);
      TasksService.BTCPriceCounter++;
    }
  }

}