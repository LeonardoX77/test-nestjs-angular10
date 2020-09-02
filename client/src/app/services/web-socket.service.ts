import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";
import { AccountList } from "../models/account-list";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  loading: boolean;

  constructor(
    private socket: Socket) {
  }

  /**
   * REQUIREMENT: lets automatically push a new exchange rate every 15 seconds to the frontend
   */
  getDollarRate(): Observable<number> {
    return Observable.create((observer) => {
      this.socket.on('msgDollarRate', (rate: number) => {
        observer.next(rate);
      });
    });
  }

  /**
   * REQUIREMENT: Let’s also send, at a random interval, the BTC price for each row. The values should be random.
   * I decided to send all the list again but with random BTC values.
   *
   * NOTE: This requirement is not really clear to me... if I understand, what it should change is the balance and
   * the availableBalance field values ramdomly. If this is the case, I have to retrieve again the whole accounts list
   * If it isn't, maybe I should retrieve the BTC price like the dollar rate? I decided to implement the first case,
   * which is more complex indeed.
   */
  getListWithRandomBTC(): Observable<AccountList> {
    return Observable.create((observer) => {
      this.socket.on('msgBTCPriceChanged', (rate: number) => {
        observer.next(rate);
      });
    });
  }

}
