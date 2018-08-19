import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isResultsLoading = false;
  form: FormGroup;
  private token = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group ({
      'password' : ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit() {
    console.log(this.form.value);
    const { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword ) {
      this.snackBar.open('암호가 일치 하지 않습니다.', '주의', { duration: 3000});
      return;
    }
    this.authService.resetPassword({token: this.token, password})
    .subscribe( data => {
      this.snackBar.open('암호변경...', '확인', { duration: 3000});
      this.router.navigate(['/login']);
    }, err => this.isResultsLoading = false, () => this.isResultsLoading = false);





  }

}
