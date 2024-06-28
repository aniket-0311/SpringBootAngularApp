import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm!: FormGroup
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder,private authService : AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackbar.open("Password do not match", "Close", { duration: 5000, panelClass: "error-snackbar" });
      return;
    }

    this.authService.signup(this.signUpForm.value).subscribe((res) => {
      if (res.id != null) {
        this.snackbar.open("Signup successful", "Close", { duration: 5000 });
        this.signUpForm.reset(); 
        this.router.navigateByUrl("/login");
      } else {
        this.snackbar.open("Signup failed", "Close", { duration: 5000, panelClass: "error-snackbar" });
      }
    },
    (err) => {
      console.log("err", err);
      if (err.status == 409) {
        this.snackbar.open(err.error, "Close", { duration: 5000, panelClass: "error-snackbar" });
        return;
      }
    });
  }
}
