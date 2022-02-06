import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsReviewComponent } from './details-review.component';

const routes: Routes = [{ path: '', component: DetailsReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsReviewRoutingModule { }
