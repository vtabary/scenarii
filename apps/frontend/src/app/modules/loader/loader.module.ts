import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoaderRoutingModule } from './loader-routing.module';
import { LoaderComponent } from './pages/loader/loader.component';
import { CSVOpenerComponent } from './components/csv-opener/csvopener.component';
import { StatusComponent } from './components/status/status.component';
import { ResetComponent } from './components/reset/reset.component';
import { FileHistoryComponent } from './components/file-history/file-history.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExtensionListPipe } from './pipes/extension-list/extension-list.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop/drag-and-drop.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    StatusComponent,
    CSVOpenerComponent,
    ResetComponent,
    FileHistoryComponent,
    FileUploadComponent,
    ExtensionListPipe,
    DragAndDropDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoaderRoutingModule,
    ReactiveFormsModule,
  ],
})
export class LoaderModule {}
