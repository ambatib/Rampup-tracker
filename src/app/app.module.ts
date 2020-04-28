import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/Input';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCardModule} from '@angular/material/card';
import { TrackerTeamMembersComponent } from './tracker-team-members/tracker-team-members.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './tracker-team-members/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { TrackerTrainingPageComponent } from './tracker-training-page/tracker-training-page.component';
import { TrackerTrainingTopicsComponent } from './tracker-training-topics/tracker-training-topics.component';
import { TrackerCreateTrainingdetailsComponent } from './tracker-training-page/tracker-create-trainingdetails/tracker-create-trainingdetails.component';
import { TrackerTrainingEditComponent } from './tracker-training-page/tracker-training-edit/tracker-training-edit.component';
import { TrackerCreateTrainingtopicsComponent } from './tracker-training-topics/tracker-create-trainingtopics/tracker-create-trainingtopics.component';
import { TrackerTopicsEditComponent } from './tracker-training-topics/tracker-topics-edit/tracker-topics-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackerHomeComponent,
    TrackerTeamMembersComponent,
    DialogBoxComponent,
    TrackerTrainingPageComponent,
    TrackerTrainingTopicsComponent,
    TrackerCreateTrainingdetailsComponent,
    TrackerTrainingEditComponent,
    TrackerCreateTrainingtopicsComponent,
    TrackerTopicsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
