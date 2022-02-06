import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateObj } from 'src/app/shared/contacts.model';
import { ContactsService } from 'src/app/shared/contacts.service';

@Component({
  selector: 'app-details-review',
  templateUrl: './details-review.component.html',
  styleUrls: ['./details-review.component.scss']
})
export class DetailsReviewComponent implements OnInit {
   letter='';
   private routeSub!: Subscription;
   contactDetails={} as UpdateObj
  constructor(private contactsService:ContactsService, private activatedRoute:ActivatedRoute,private router:Router) {
   }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      this.contactsService.getItem(id).subscribe(res=>{
        
        this.contactDetails=res as any
        this.letter=res.name.charAt(0).toUpperCase()
      })
    
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
