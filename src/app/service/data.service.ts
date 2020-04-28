import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMembers } from '../model/teammembers';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TrainingTopics } from '../model/trainingtopics';
import { TrainingDetails } from '../model/trainingdetails';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = 'http://localhost:3000';
  APPLICATION_URL = 'http://localhost:8082/test';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getApplicationMessage(): Observable<any>{
    return this.httpClient.get<any>(this.APPLICATION_URL + '/hello', this.httpOptions).pipe( );

  }

  getAllTeamMembers(): Observable<TeamMembers[]>{
    return this.httpClient.get<TeamMembers[]>(this.API_URL + '/teammembers/', this.httpOptions).pipe();
  }

  public addTeamMember(teammembers): Observable<TeamMembers>{
      return this.httpClient.post<TeamMembers>(this.API_URL + '/teammembers/', JSON.stringify(teammembers), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

  public deleteMember(id: number){
      console.log(id);
      return this.httpClient.delete<TeamMembers>(this.API_URL + '/teammembers/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    update(id, teammembers): Observable<TeamMembers> {
      return this.httpClient.put<TeamMembers>(this.API_URL + '/teammembers/' + id, JSON.stringify(teammembers), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    createTraining(traingdetail): Observable<TrainingDetails> {
      return this.httpClient.post<TrainingDetails>(this.API_URL + '/trainingdetails/', JSON.stringify(traingdetail), this.httpOptions)
      .pipe(
      );
    }

    updateTraining(traingdetail): Observable<TrainingDetails> {
      console.log(' update training' + traingdetail);
      return this.httpClient.put<TrainingDetails>(
        this.API_URL + '/trainingdetails/' + traingdetail.id, JSON.stringify(traingdetail), this.httpOptions)
      .pipe(
      );
    }
    getAllTraingDetails(): Observable<TrainingDetails[]> {
      console.log('get all training details');
      return this.httpClient.get<TrainingDetails[]>(this.API_URL + '/trainingdetails')
      .pipe(
        catchError(this.errorHandler)
      );
    }


    deleteTraining(id: number): Observable<{}> {
      console.log('Delete training' + id + 'test');
      const url = `${this.API_URL}/trainingdetails/${id}`;
      return this.httpClient.delete(url, this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        );
    }

    getByTrainingDetailsId(id): Observable<TrainingDetails> {
      console.log('Get training details by ID::' + id);
      const url = `${this.API_URL}/trainingdetails/${id}`;
      console.log('URL::' + url);
      return this.httpClient.get<TrainingDetails>(url, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    updateTopic(traingtopic): Observable<TrainingTopics> {
      return this.httpClient.put<TrainingTopics>(
        this.API_URL + '/trainingtopics/' + traingtopic.id, JSON.stringify(traingtopic), this.httpOptions)
      .pipe(
      );
    }

    getByTopicDetailsId(topicId): Observable<TrainingTopics> {
      const url = `${this.API_URL}/trainingtopics/${topicId}`;
      return this.httpClient.get<TrainingTopics>(url, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );

    }

    getTopicsByTrainingDetailsId(trainingDetails): Observable<TrainingTopics[]> {
      const url = `${this.API_URL}/trainingTopics/?trainingDetails=${trainingDetails}`;
      return this.httpClient.get<TrainingTopics[]>(url, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }
    createTopic(topic): Observable<TrainingTopics> {
      return this.httpClient.post<TrainingTopics>(this.API_URL + '/trainingtopics/', JSON.stringify(topic), this.httpOptions)
      .pipe(
      );
    }
    getAllTraingTopics(): Observable<TrainingTopics[]>{
      console.log('get all training topics');
      return this.httpClient.get<TrainingTopics[]>(this.API_URL + '/trainingtopics')
      .pipe(
        catchError(this.errorHandler)
      );
    }

    deleteTopic(id: number): Observable<{}> {
      console.log('Delete topic' + id + 'test');
      const url = `${this.API_URL}/trainingtopics/${id}`;
      return this.httpClient.delete(url, this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        );
    }

    errorHandler(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
   }
  }

