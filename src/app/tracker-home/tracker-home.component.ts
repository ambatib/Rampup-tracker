import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { TrainingDetails } from '../model/trainingdetails';



@Component({
  selector: 'app-tracker-home',
  templateUrl: './tracker-home.component.html',
  styleUrls: ['./tracker-home.component.css']
})
export class TrackerHomeComponent implements OnInit {

  panelOpenState = false;
  trainings : TrainingDetails[];
  inProgressTrainings = [];
  completedTrainings:string[];
  yetToStartTrainings:string[];
  total: number;
  today = new Date();
  
  constructor(private dataservice: DataService) { }
  
  ngOnInit(): void {
    this.dataservice.getAllTraingDetails().subscribe((data: TrainingDetails[])=> {
      this.trainings = data;
      console.log(this.trainings);
      console.log(this.inProgressTrainings.push('one'));
    });   
    this.dashboardDetail(this.trainings);
  }

  public dashboardDetail(trainDeatils: TrainingDetails[]){
    this.trainings.forEach( row => {
      if(this.today > row.startDate && this.today < row.endDate){
        console.log('inprogress');
        this.inProgressTrainings.push(row.trainingName);
        console.log(this.inProgressTrainings);
      }
      if(this.today > row.endDate){
        console.log('completed');
        this.completedTrainings.push(row.trainingName);
        console.log(this.completedTrainings);
      }
      if(this.today > row.startDate){
        console.log('yest');
        this.yetToStartTrainings.push(row.trainingName);
        console.log(this.yetToStartTrainings);
      }
      this.total = this.trainings.length;
    });
  }
  
}
