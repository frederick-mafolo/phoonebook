import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', 
    component: HomeComponent,
    children: [
     { path: '', 
      component: ContactListComponent},
      {
        path: 'add-contacts',
        loadChildren: () =>
          import('./add-contacts/add-contacts.module').then(
            (m) => m.AddContactsModule
          ),
      },
      {
        path: 'details-review/:id',
        loadChildren: () =>
          import('./details-review/details-review.module').then(
            (m) => m.DetailsReviewModule
          ),
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
    ] },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
