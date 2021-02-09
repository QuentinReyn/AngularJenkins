import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
 API_ENDPOINT = 'http://localhost:3000';
  public listUser() {
    return this.http.get(this.API_ENDPOINT + "/user" + "/list");
  }

  public getUserById(userID: any) {
    return this.http.get(this.API_ENDPOINT + "/user" + "/edit/"+userID);
  }

  public addUser(userForm: any) {
    let body = { name: userForm.value.name, zipCode: userForm.value.zipCode, binIDs: userForm.value.binIDs };
    return this.http.post(this.API_ENDPOINT + "/user"+ "/new", body).subscribe();
  }

  public updateUser(userForm: any) {
    let body = { name: userForm.value.name, zipCode: userForm.value.zipCode, binIDs: userForm.value.binIDs };
    return this.http.post(this.API_ENDPOINT + "/user"+ "/update/"+userForm.value.id,  body).subscribe();
  }

  public deleteUserById(userID: any) {
    return this.http.delete(this.API_ENDPOINT + "/user" + "/delete/" + userID);
  }
}
