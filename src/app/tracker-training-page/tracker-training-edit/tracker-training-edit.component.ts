import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingDetails } from '@core/model/trainingdetails';
import { DataService } from '@core/service/data.service';
import { DateValidator } from '@core/validaton/datevalidator';

@Component({
  selector: 'app-tracker-training-edit',
  templateUrl: './tracker-training-edit.component.html',
  styleUrls: ['./tracker-training-edit.component.css']
})
export class TrackerTrainingEditComponent implements OnInit {
  trainingDetail: TrainingDetails;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dataService: DataService) {

               }

  ngOnInit() {
    const trainingId = window.localStorage.getItem('editTrainingId');
    if (!trainingId) {
      alert('Invalid action.');
      this.router.navigate(['tracker-training-page']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      trainingName: ['', Validators.required],
      topic: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]}, {validator: DateValidator.dateLessThan('startDate', 'endDate')}
    );
    this.dataService.getByTrainingDetailsId(trainingId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });

  }

  submitForm() {

    console.log('Inside submit form' );
    if (this.editForm.invalid) {
      console.log('Please enter all details');
      return;
    }
    this.dataService.updateTraining(this.editForm.value).subscribe(() => {
      console.log('Training topic updated!');
      this.router.navigateByUrl('tracker-training-page');
    });
  }

}
