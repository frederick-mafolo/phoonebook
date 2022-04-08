import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UpdateObj } from 'src/app/shared/contacts.model';
import { ContactsService } from 'src/app/shared/contacts.service';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements AfterViewInit,OnInit {

  displayedColumns: string[] = [ 'name', 'phonenumber', 'jobtitle'];
  dataSource= new MatTableDataSource();
  updateObj!:UpdateObj;
  contactList$!:Observable<any>;
  private subjectKeyUp = new Subject<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private contactsService:ContactsService,private _liveAnnouncer: LiveAnnouncer,private router: Router) {

  }

  ngOnInit(): void {
    
    this.contactList$ = this.contactsService.getContacts();

    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.getContact(d);
      });
  }
  onSearch($event: any) {
    const value = $event.target.value;
    this.subjectKeyUp.next(value);
  }

  getContact(value: string) {
   this.contactsService.searchItem(value).subscribe(res=>{
      this.dataSource.data= res as any 
    });
    
  }
  ngAfterViewInit() {
    this.contactsService.getList().subscribe((val)=>{
      this.dataSource.data= val as any  
      this.contactsService.updateContacts(this.dataSource.data);
    })

    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  viewContacts(contact:any) {
    let route = '/details-review';

    let id= contact.id.toString() 
    this.router.navigate([route,id]);
  }

}
