import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { ClientDialogFormComponent } from '../form-dialog/client-dialog-form';
import { map, flatMap, filter } from 'rxjs/operators';
import { remove} from 'lodash';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
  isResultLoading = false;
  constructor(
    public dialog: MatDialog,
    private service: ClientService,
    private snackBar: MatSnackBar
  ) { }

  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  ngOnInit() {
    this.isResultLoading = true;
     this.service.getClients()
     .subscribe( (data) => {

       this.dataSource.data = data;
       this.isResultLoading = false;
     }, err => {
        this.isResultLoading = false;
        console.log(err);
      }, () => this.isResultLoading = false );
  }


  delete(id: string) {
     
    this.service.delteClient(id)
    .subscribe( data => {
      const removedItems =   remove(this.dataSource.data, (item) => {
            return item._id === data._id;
         });
         this.dataSource.data = [...this.dataSource.data];
      },
      err => console.log(err)
      );
     
  }

  openDialog(clientId): void {
      const options = {
        width: '400px',
        height: '400px',
        data: {}
      };
 
      if (clientId) {
          const item_data =  this.dataSource.data.filter( item => item._id === clientId);
          options.data = item_data;
      }
    const dialogRef = this.dialog.open(ClientDialogFormComponent, options);

    dialogRef.afterClosed()
    .pipe(
      filter( clientParams => typeof clientParams === 'object'),
      flatMap( data => {
        if (clientId) {
          return this.service.updateClient(clientId, data);
        } else {
          return this.service.createClient(data);
        }
      })
    ).subscribe( result => {
        let successMsg = '';
        if (clientId) {
              const index = this.dataSource.data.findIndex(client => client._id === clientId);
              this.dataSource.data[index] = result;
              successMsg = '갱신 했습니다.';
        } else {
          this.dataSource.data.push(result);
          successMsg = '생성 했습니다.';
        }

        this.dataSource.data = [...this.dataSource.data];
        this.snackBar.open(successMsg, '성공', { duration: 2000});

    });

  }

}


