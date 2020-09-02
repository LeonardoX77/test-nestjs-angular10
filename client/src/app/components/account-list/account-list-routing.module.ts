import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcountListComponent } from './account-list.component';

const routes: Routes = [
    {
        path: '',
        component: AcountListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountListRoutingModule {}
