import { Component, OnInit } from '@angular/core';
import { Choice } from 'src/app/models/choice.model';
import { User } from 'src/app/models/user.model';
import { ChoiceUserUserService } from 'src/app/services/choice-user.service';
import { ChoiceService } from 'src/app/services/choice.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private choiceService: ChoiceService,
    private choiceuserService: ChoiceUserUserService
  ) {}

  cardVotes = [{ id: 1, title: 'Choix A', nbVotes: 0 }];
  listUsers: User[] = [];
  listChoices: Choice[] = [];
  ngOnInit(): void {
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
      console.log(this.listChoices);
    });
  }

  saveChoice(userID: any, choiceID: any) {}
}
