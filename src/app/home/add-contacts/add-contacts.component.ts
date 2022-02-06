import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts } from 'src/app/shared/contacts.model';
import { ContactsService } from 'src/app/shared/contacts.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.scss'],
})
export class AddContactsComponent implements OnInit {
  contactsForm!: FormGroup;
  newContacts = {} as Contacts;
  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.contactsForm = this.fb.group({
      name: [''],
      mobilenumber: [''],
    });
  }
  keyDown(value: any) {
    const allowedRegex = /[0-9\+]/g;

    if (!allowedRegex.test(value.key)) {
      value.preventDefault();
    }
  }

  onSubmit() {
    let contactData = this.contactsForm.value;
    let uniq = 'c' + new Date().getTime();

 
    this.newContacts.id = uniq;
    this.newContacts.name = contactData.name;
    this.newContacts.mobilenumber = contactData.mobilenumber;

    this.contactsService.createItem(this.newContacts).subscribe(() => {
      this.router.navigate(['/details-review', uniq]);
    });
  
  }
}
