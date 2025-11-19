import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/_index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-databinding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  templateUrl: './databinding.component.html',
  styleUrl: './databinding.component.css',
})
export class DatabindingComponent implements OnInit, OnDestroy {
  // authSubscription: Subscription[] = [];
  productName: string = 'Angular Book';
  productcode: string = 'ANG-001';
  btnText: string = 'Login';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.authenticated()) {
      this.btnText = 'Logged In';
    }
    else {
      this.btnText = 'Login(Toggle)';
    }
  }

  onClickMe() {
    //console.log('Button clicked!');
    alert(`Button clicked! Product: ${this.productName}`);
  }

  // Login() {
  //   this.authService.login();
  //   console.log('User logged in status:', this.authService.authenticated());
  //   if (this.authService.authenticated()) {
  //     this.btnText = 'Logged In';
  //   }
  //   else {
  //     this.btnText = 'Login(Toggle)';
  //   }
  //   // this.authSubscription.push(authsub);
  // }

  ngOnDestroy(): void {
    // this.authSubscription.forEach(sub => sub.unsubscribe());
  }

}
