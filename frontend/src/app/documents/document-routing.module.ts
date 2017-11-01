import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AuthGuard} from '../auth/auth-guard.service';
import {DocumentsComponent} from './documents.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  ])],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}
