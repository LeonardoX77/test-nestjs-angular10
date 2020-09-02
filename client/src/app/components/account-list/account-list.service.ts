import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from "../../services/api.service";
import { AccountList } from "../../models/account-list";
import { environment } from "../../../environments/environment";
import { RatesService } from "../../services/rates.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  loading: boolean;

  constructor(
      private httpService: HttpService,
      private ratesService: RatesService) {
  }

  getList(): Observable<AccountList> {
    this.loading = true;

    const callBack = this.httpService.get<AccountList>(`${environment.apiUrl}/account/list`)
    .pipe(
      catchError(err => {
        console.log('Handling error', err);
        return throwError(err);
      }),
      tap(data => {
        this.ratesService.setRate(data.dollarRate);
        this.loading = false;
      })
    );

    return callBack;
  }
}
