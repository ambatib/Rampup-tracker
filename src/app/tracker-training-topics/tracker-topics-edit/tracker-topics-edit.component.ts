import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingTopics } from '@core/model/trainingtopics';
import { DataService } from '@core/service/data.service';
import { TrainingDetails } from '@core/model/trainingdetails';
import { DateValidator } from '@core/validaton/datevalidator';

@Component({
  selector: 'app-tracker-topics-edit',
  templateUrl: './tracker-topics-edit.component.html',
  styleUrls: ['./tracker-topics-edit.component.css']
})
export class TrackerTopicsEditComponent implements OnInit {
  trainingTopic: TrainingTopics;
  editTopicForm: FormGroup;
  trainingDetails = [];
  currentDate = new Date().toString;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {

    const topicId = window.localStorage.getItem('editTopicId');
    console.log('Topic Id:::' + topicId);
    if (!topicId) {
      alert('Invalid action.');
      this.router.navigate(['tracker-training-topic']);
      return;
    }
    this.editTopicForm = this.formBuilder.group({
      id: [''],
      topicName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      trainingDetails: ['']}, {validator: DateValidator.dateLessThan('startDate', 'endDate')}
      );
    this.dataService.getAllTraingDetails().subscribe((data: TrainingDetails[]) =>
      {
        this.trainingDetails = data;
            });
    this.dataService.getByTopicDetailsId(topicId)
      .subscribe( data => {
        this.editTopicForm.setValue(data);
    });
  }

  submitForm() {
    if (this.editTopicForm.invalid) {
      console.log('Please enter all details');
      return;
    }
    this.dataService.updateTopic(this.editTopicForm.value).subscribe(() => {
      console.log('Training topic updated!');
      this.router.navigateByUrl('tracker-training-topic');
    });
  }
}
