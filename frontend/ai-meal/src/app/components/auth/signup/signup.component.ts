import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // ✅ Import this

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [    ReactiveFormsModule  // ✅ Add this
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator for password confirmation
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Form submission logic
  onSubmit() {
    this.submitted = true;
  
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response: any) => {
          console.log('✅ Signup successful:', response);
          alert('Signup successful!');
          this.signupForm.reset();
  
          // 🚀 Navigate to HomeComponent after successful signup
          this.router.navigate(['/login']);  
        },
        error: (error: any) => {
          console.error('❌ Signup error:', error);
          
          if (error.status === 400) {
            console.error('🔴 Bad Request: ', error.error);
          } else if (error.status === 401) {
            console.error('🔴 Unauthorized: ', error.error);
          } else if (error.status === 403) {
            console.error('🔴 Forbidden: ', error.error);
          } else if (error.status === 500) {
            console.error('🔴 Server Error: ', error.error);
          } else {
            console.error('🔴 Unknown Error:', error);
          }
  
          alert(`Signup failed: ${error.error?.message || 'Try again later.'}`);
        }
      });
    } else {
      console.warn('⚠️ Form is invalid. Please check the fields.');
    }
  }
  

  // Helper method to access form controls easily
  get f() {
    return this.signupForm.controls;
  }
}
