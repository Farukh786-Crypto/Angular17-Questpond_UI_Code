import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabindingComponent } from './components/customer/databinding/databinding.component';
import { DirectiveSampleComponent } from './components/customer/directive-sample/directive-sample.component';
import { PipeSampleComponent } from './components/pipe-sample/pipe-sample.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { MessageService } from './Services/message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DatabindingComponent,
    DirectiveSampleComponent,
    PipeSampleComponent,
    MenuComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MyProj';
  message!: string;
  constructor(private messageService: MessageService) {
    this.messageService.getMessage().subscribe({
      next: (msg) => {
        this.message = msg;
      },

    })
  }



}
