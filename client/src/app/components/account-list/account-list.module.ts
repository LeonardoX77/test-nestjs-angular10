import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcountListComponent } from './account-list.component';
import { AccountListRoutingModule } from './account-list-routing.module';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AcountListComponent //, DollarRatePipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    AccountListRoutingModule,
    PipeModule
  ],
  // exports: [DollarRatePipe]
})
export class AccountListModule { }
