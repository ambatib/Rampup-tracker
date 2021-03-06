import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@core/service/data.service';
import { TrainingDetails } from '@core/model/trainingdetails';
import { DateValidator } from '@core/validaton/datevalidator';

@Component({
  selector: 'app-tracker-create-trainingtopics',
  templateUrl: './tracker-create-trainingtopics.component.html',
  styleUrls: ['./tracker-create-trainingtopics.component.css']
})
export class TrackerCreateTrainingtopicsComponent implements OnInit {
  topicDetailsForm: FormGroup;
  trainingDetails = [];

  constructor(public fb: FormBuilder,
              private router: Router,
              public dataService: DataService) {
              }

  ngOnInit() {
    this.topicDetailsForm = this.fb.group({
      topicName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      trainingDetails: ['', Validators.required]}, { validator: DateValidator.dateLessThan('startDate', 'endDate')}
      );
    this.dataService.getAllTraingDetails().subscribe((data: TrainingDetails[]) =>
      {
        this.trainingDetails = data;
      });
  }

  submitForm() {
    if (this.topicDetailsForm.invalid) {
      console.log('Please enter all details');
      return;
    }
    this.dataService.createTopic(this.topicDetailsForm.value).subscribe(() => {
      console.log('Training topic created!');
      this.router.navigateByUrl('tracker-training-topic');
    });
  }

}
