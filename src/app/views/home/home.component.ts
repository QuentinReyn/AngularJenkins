import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/models/choice.model';
import { User } from 'src/app/models/user.model';
import { ChoiceUserUserService } from 'src/app/services/choice-user.service';
import { ChoiceService } from 'src/app/services/choice.service';
import { UserService } from 'src/app/services/user.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private choiceService: ChoiceService,
    private choiceuserService: ChoiceUserUserService,
    private sidenav: SidenavComponent
  ) {}

  listUsers: User[] = [];
  listChoices: Choice[] = [];
  listChoicesUsers: any;
  user: any;
  choiceIdOfCurrentUser: number = 0;
  ngOnInit(): void {
    var object = localStorage.getItem('currentUser') || '{}';
    this.user = JSON.parse(object);
    this.sidenav.user = this.user;
    console.log(this.user);
    this.getUsers();
    this.getChoices();
  }

  getUsers() {
    this.userService.listUser().subscribe((data) => {
      //@ts-ignore
      this.listUsers = data.data;
      console.log(this.listUsers);
    });
  }

  getChoices() {
    this.choiceService.listChoice().subscribe((data) => {
      //@ts-ignore
      this.listChoices = data.data;
      this.getChoiceUser();
    });
  }

  getChoiceUser() {
    this.choiceuserService.listChoiceUser().subscribe((data) => {
      //@ts-ignore
      this.listChoicesUsers = data.data;
      console.log(this.listChoicesUsers);
      this.choiceIdOfCurrentUser = this.listChoicesUsers.find((m: { UserID: any; })=>m.UserID == this.user.Id).ChoiceID;
      console.log(this.choiceIdOfCurrentUser);
      for (var i = 0; i < this.listChoices.length; i++) {
        this.listChoices[i].VoteCount = 0;
        for (var y = 0; y < this.listChoicesUsers.length; y++) {
          if (this.listChoices[i].Id == this.listChoicesUsers[y]['ChoiceID'])
            this.listChoices[i].VoteCount = this.listChoices[i].VoteCount + 1;
          console.log(
            this.listChoices[i].Id + ' - ' + this.listChoices[i].VoteCount
          );
        }
      }
    });
  }

  vote(choiceID: any) {
    if(this.choiceIdOfCurrentUser == 0){
      this.choiceuserService.addChoiceUser(choiceID, this.user.Id);
      this.getChoices();
    }
    else{
      this.choiceuserService.updateChoiceUser(choiceID, this.user.Id);
      this.getChoices();
    }  
  }

  saveChoice(userID: any, choiceID: any) {

  }
}
