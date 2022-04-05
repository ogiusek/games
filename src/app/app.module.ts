import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HanoiComponent } from './hanoi/hanoi.component';
import { SortingComponent } from './sorting/sorting.component';
import { ReversiComponent } from './reversi/reversi.component';

@NgModule({
  declarations: [
    AppComponent,
    HanoiComponent,
    SortingComponent,
    ReversiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
