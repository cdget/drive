import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { DriveComponent } from './drive/drive.component';

@NgModule({
  declarations: [
    AppComponent,
    DriveComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[MatIconModule,MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
