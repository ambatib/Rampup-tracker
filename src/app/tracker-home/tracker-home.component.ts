import { Component, OnInit } from '@angular/core';
import { TrainingTopics } from '@core/model/trainingtopics';
import { Router } from '@angular/router';
import { TrainingDetails } from '@core/model/trainingdetails';
import { DataService } from '@core/service/data.service';
import { TeamMembers } from '@core/model/teammembers';
import { Employee } from '@core/model/employee';

@Component({
  selector: 'app-tracker-home',
  templateUrl: './tracker-home.component.html',
  styleUrls: ['./tracker-home.component.css']
})

export class TrackerHomeComponent implements OnInit {

  panelOpenState = false;
  trainings: TrainingDetails[];
  topics: TrainingTopics[] = [];
  today = new Date();
  upcomingTrainingDetails: TrainingDetails[] = [];
  completedTrainingDetails: TrainingDetails[] = [];
  inprogressTrainingDetails: TrainingDetails[] = [];
  teamMembers: TeamMembers[] = [];
  employees: Employee[] = [];
  todayDate: string;
  month: string;
  constructor(private dataservice: DataService,
              public router: Router) { }

  ngOnInit(){
    this.dataservice.getAllTraingDetails().subscribe((data: TrainingDetails[]) => {
      this.trainings = data;
      this.upcomingTrainingDetails = this.getUpcomingTrainings();
      this.completedTrainingDetails = this.getCompletedTrainingDetails();
      this.inprogressTrainingDetails = this.getInProgressTrainingDetails();
    });
    this.dataservice.getAllTeamMembers().subscribe((memberdata: TeamMembers[]) => {
      this.teamMembers = memberdata;
    });
    this.dataservice.getApplicationMessage().subscribe(message => {
      console.log('From app1' + message.DATE);
      const userStr = JSON.stringify(message.DATE);
      console.log('userstr' + userStr);
      this.todayDate = JSON.parse(userStr);
      console.log('From app2 ' + message.Month);
      this.month = JSON.parse(JSON.stringify(message.Month));

    });
    this.dataservice.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;

    });
  }
  getInProgressTrainingDetails(): TrainingDetails[] {
    this.trainings.forEach( row => {
      const startDate = new Date(row.startDate).getDate();
      const endDate = new Date(row.endDate).getDate();
      const currentDate = this.today.getDate();
      if (currentDate > startDate && currentDate < endDate){
        this.inprogressTrainingDetails.push(row);
      }
      row.progress = ((currentDate - startDate) / (endDate - startDate)) * 100;
      this.dataservice.getTopicsByTrainingDetailsId(row.id).subscribe(data => {
      row.numberofTopics = data.length;
      });
    });
    return this.inprogressTrainingDetails;
  }
  getCompletedTrainingDetails(): TrainingDetails[] {
    this.trainings.forEach( row => {
      if (this.today < new Date(row.endDate)){
        this.completedTrainingDetails.push(row);
      }
     });
    return this.completedTrainingDetails;
  }
  getUpcomingTrainings(): TrainingDetails[] {
    this.trainings.forEach( row => {
      if (this.today < new Date(row.startDate)){
        this.upcomingTrainingDetails.push(row);
      }
     });
    return this.upcomingTrainingDetails;
  }
  getTopicsByTrainingDetailsId(topicDetailsId) {
    window.localStorage.removeItem('topicDetailsId');
    window.localStorage.setItem('topicDetailsId', topicDetailsId.toString());
    this.router.navigateByUrl('tracker-training-topic');
  }

  getAllTeamMembers(){
    this.router.navigateByUrl('tracker-team-members');
  }
}
