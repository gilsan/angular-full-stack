import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

   @Output() toggleSidenav = new EventEmitter<void>();
  constructor(
    private router: Router,
    private service: JwtService
   ) { }

  ngOnInit() {
  }

  logout() {
   this.service.destroyToken();
   this.router.navigate(['/login']);

  }

}
