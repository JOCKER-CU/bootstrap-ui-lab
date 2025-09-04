import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FolderBrowserComponent } from './folder-browser/folder-browser.component';
import { WorkbenchComponent } from './workbench/workbench.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderBrowserComponent,
    WorkbenchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
