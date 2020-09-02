import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { HttpService } from "../../services/api.service";
import { environment } from "../../../environments/environment";
import { ExchangeAccount } from "../../models/exchange-account";

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  loading: boolean;
  dollarRate: number;
  lastUpdate: Date;

  constructor(
      private httpService: HttpService) {
  }

  get(id: number): Observable<ExchangeAccount> {
    this.loading = true;

    const callBack = this.httpService.get<ExchangeAccount>(`${environment.apiUrl}/account/${id}`)
    .pipe(
      catchError(err => {
        console.log('Handling error', err);
        return throwError(err);
      }),
      tap(() => this.loading = false)
    );

    return callBack;
  }

}
