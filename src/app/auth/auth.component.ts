import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { LoginRsp, SignupRsp, User } from '../core/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  title = '';
  subject = '';
 // test = '';
  isResultLoading = false;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private jwt: JwtService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
     email: ['', Validators.required],
     password: ['', Validators.required],
     name: ['']
    });
  }

  ngOnInit() {
    this.title = this.router.url === '/login' ? 'Login' : 'Signup';
    this.subject = this.router.url === '/login' ? '로그인' : '등록';
  }

  onSubmit() {
    if (this.title === 'Signup') {
      this.isResultLoading = true;
      this.service.signup(this.authForm.value)
        .subscribe( (data: SignupRsp) => {
          console.log(data.message);
          this.snackBar.open('등록되었습니다.', '등록', {duration: 3000});
          this.router.navigate(['/login']);
        }, err => this.errorHandler(err, '무언가 잘못되었습니다.'), () => this.isResultLoading = false );
    } else if (this.title === 'Login') {
    //  this.isResultLoading = true;
      console.log('로그인:', this.authForm.value);
      const { email, password } = this.authForm.value;
      const user: User = { email, password };
      this.service.login(user)
      .subscribe((data: LoginRsp) => {
        console.log('로그인:', data);
        this.jwt.setToken(data.token);
        this.router.navigate(['/dashboard', 'invoices']);
      }, err => this.errorHandler(err, '무언가 잘못되었습니다.'), () => this.isResultLoading = false );
    }

  }

  goLogin() {
     this.router.navigate(['/login']);
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }

  forgotPassHandler() {
    console.log('forgot');
    this.router.navigate(['/forgot-password']);
  }

  private errorHandler(error, message) {
     this.isResultLoading = false;
     console.log(error);
     this.snackBar.open(message, 'Error', { duration: 2000});
  }



}
