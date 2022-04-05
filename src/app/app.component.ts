import { Component } from '@angular/core';
import { HanoiComponent } from './hanoi/hanoi.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hanoi = new HanoiComponent();
  
}
