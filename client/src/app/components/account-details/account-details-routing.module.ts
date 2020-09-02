import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcountDetailsComponent } from './account-details.component';

const routes: Routes = [
    {
        path: ':id',
        component: AcountDetailsComponent
    },
    {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountDetailsRoutingModule {}
