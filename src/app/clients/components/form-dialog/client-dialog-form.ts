import { Component, Inject , OnInit} from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'client-dialog-form.html',
  styleUrls: ['client-dialog-form.scss']
})
export class ClientDialogFormComponent implements OnInit {
    title: string = '사용자 만들기';
  clientForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ClientDialogFormComponent>,
    private fb: FormBuilder,
    private service: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {  }

  onNoClick(): void {
    this.dialogRef.close();
   
  }
  ngOnInit() {   
    this.initClientForm();
    
     if (this.data ) {
       this.title ='사용자 수정';
     }
  }

  private initClientForm() {
     this.clientForm = this.fb.group({
       firstName: ['', Validators.required],
       lastName: ['', Validators.required],
       email: ['', Validators.required]
     });
  }

  onSubmit() {}

}
