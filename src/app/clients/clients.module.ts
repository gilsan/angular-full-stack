import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '../material.module';


import { ClientListingComponent,  } from './components/client-listing/client-listing.component';
import { ClientService } from './services/client.service';
import { ClientDialogFormComponent } from './components/form-dialog/client-dialog-form';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule

  ],
  declarations: [ClientListingComponent , ClientDialogFormComponent],
  exports: [ClientListingComponent],
  providers: [ClientService ],
  entryComponents: [ClientDialogFormComponent]
})
export class ClientsModule { }
