import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { DetailsReviewRoutingModule } from './details-review-routing.module';
import { DetailsReviewComponent } from './details-review.component';


@NgModule({
  declarations: [
    DetailsReviewComponent
  ],
  imports: [
    CommonModule,
    DetailsReviewRoutingModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class DetailsReviewModule { }
