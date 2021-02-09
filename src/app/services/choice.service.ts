import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  constructor(private http: HttpClient) { }
 API_ENDPOINT = 'http://localhost:3000';
  public listChoice() {
    return this.http.get(this.API_ENDPOINT + "/choice" + "/list");
  }

  public getChoiceById(choiceID: any) {
    return this.http.get(this.API_ENDPOINT + "/choice" + "/edit/"+choiceID);
  }

  public addChoice(choiceForm: any) {
    let body = { title: choiceForm.value.title };
    return this.http.post(this.API_ENDPOINT + "/choice"+ "/new", body).subscribe();
  }

  public updateChoice(choiceForm: any) {
    let body = { title: choiceForm.value.title };
    return this.http.post(this.API_ENDPOINT + "/choice"+ "/update/"+choiceForm.value.id,  body).subscribe();
  }

  public deleteChoiceById(choiceID: any) {
    return this.http.delete(this.API_ENDPOINT + "/choice" + "/delete/" + choiceID);
  }
}
