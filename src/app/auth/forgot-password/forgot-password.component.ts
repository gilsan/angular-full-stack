import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isResultsLoading = false;
   form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group ({
      'email' : ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value);
    this.authService.forgotPassword(this.form.value)
     .subscribe( data => {
           this.snackBar.open(data.message, '성공', { duration: 2000});
     }, err => this.isResultsLoading = false, () => this.isResultsLoading = false);
  }

}
