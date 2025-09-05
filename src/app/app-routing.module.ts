import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderBrowserComponent } from './folder-browser/folder-browser.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { DocumentManagerComponent } from './document-manager/document-manager.component';

const routes: Routes = [
  { path: '', component: FolderBrowserComponent },
  { path: 'workbench', component: WorkbenchComponent },
  { path: 'image-gallery', component: ImageGalleryComponent },
  { path: 'document-manager', component: DocumentManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
