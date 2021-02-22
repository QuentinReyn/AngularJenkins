import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChoiceUserUserService {

  constructor(private http: HttpClient) { }
 API_ENDPOINT = 'http://localhost:3000';
  public listChoiceUser() {
    return this.http.get(this.API_ENDPOINT + "/choiceuser" + "/list");
  }

  public getChoiceUserById(choiceuserID: any) {
    return this.http.get(this.API_ENDPOINT + "/choiceuser" + "/edit/"+choiceuserID);
  }

  public addChoiceUser(choiceId:any,userId:any) {
    let body = { choiceID: choiceId, userID: userId };
    return this.http.post(this.API_ENDPOINT + "/choiceuser"+ "/new", body).subscribe();
  }

  public updateChoiceUser(choiceID:any,userID:any) {
    let body = {};
    return this.http.post(this.API_ENDPOINT + "/choiceuser"+ "/update/"+choiceID+"/"+userID,body).subscribe();
  }

  public deleteChoiceUserById(choiceuserID: any) {
    return this.http.delete(this.API_ENDPOINT + "/choiceuser" + "/delete/" + choiceuserID);
  }
}
