import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FileManagerRoutingModule } from './file-manager-routing.module';
import { LoaderComponent } from './pages/loader/loader.component';
import { StatusComponent } from './components/status/status.component';
import { ResetComponent } from './components/reset/reset.component';
import { FileHistoryComponent } from './components/file-history/file-history.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExtensionListPipe } from './pipes/extension-list/extension-list.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop/drag-and-drop.directive';
import { FileHistoryItemComponent } from './components/file-history-item/file-history-item.component';
import { CSVConfiguratorComponent } from './components/csv-configurator/csv-configurator.component';
import { CSVConfiguratorFieldComponent } from './components/csv-configurator-field/csv-configurator-field.component';
import { CSVUploaderComponent } from './components/csv-uploader/csv-uploader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    StatusComponent,
    ResetComponent,
    FileHistoryComponent,
    FileUploadComponent,
    ExtensionListPipe,
    DragAndDropDirective,
    FileHistoryItemComponent,
    CSVConfiguratorComponent,
    CSVConfiguratorFieldComponent,
    CSVUploaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileManagerRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FileManagerModule {}
