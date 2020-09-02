import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../../pipes/pipes.module';
import { AccountDetailsRoutingModule } from './account-details-routing.module';
import { AcountDetailsComponent } from './account-details.component';

@NgModule({
  declarations: [
    AcountDetailsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AccountDetailsRoutingModule,
    PipeModule,
  ],
})
export class AccountDetailsModule { }
