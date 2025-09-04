import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderBrowserComponent } from './folder-browser/folder-browser.component';
import { WorkbenchComponent } from './workbench/workbench.component';

const routes: Routes = [
  { path: '', component: FolderBrowserComponent },
  { path: 'workbench', component: WorkbenchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
