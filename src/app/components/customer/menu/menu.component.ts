import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/_index';
import { User } from '../../../models/user';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  currentUser: User | undefined;
  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.loadAuthUser();
    console.log('this.currentUJser of result', this.currentUser)
  }

  logout() {
    this.authService.removeAuthUser();
    this.router.navigateByUrl('/login');
  }

}
