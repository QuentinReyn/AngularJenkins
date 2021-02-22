import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Choice } from 'src/app/models/choice.model';
import { ChoiceService } from 'src/app/services/choice.service';
import { ChoiceFormComponent } from './choice-form/choice-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrls: ['./choice-list.component.scss']
})
export class ChoiceListComponent implements OnInit {

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private choiceService: ChoiceService, public snackBar: MatSnackBar, public dialog: MatDialog, private _router: Router) { }

  isLoadingResults = false;
  totalChoices = 0;
  isMeOnly = false;
  columnsToDisplay = ["id", "title", "actions"];
  choices = new MatTableDataSource();
  listChoices: Choice[] = [];

  getChoices(): void {
      this.choiceService.listChoice().subscribe(
          data => {
            //@ts-ignore
              this.choices.data = data.data as Choice[];
          }
      );
  }

  ngOnInit() {
      // If the choice changes the sort order, reset back to the first page.
      this.getChoices();
  }

  deleteChoiceById(choice_id : any) {
      var ans = confirm("Do you want to delete this choice ?");
      if (ans) {
          this.choiceService.deleteChoiceById(choice_id).subscribe(success => {
              this.getChoices();
              //@ts-ignore
              this.snackBar.open("✅ Choice successfully deleted ✅", null, {
                  duration: 3000,
              });
          })
      }
  }

  openChoiceModalAdd() {
      let dialogRef = this.dialog.open(ChoiceFormComponent, {
          width: '600px',
          height: '400px'
      });
      dialogRef.afterClosed().subscribe(() => {
          this.getChoices();
      })
  }

  openChoiceModalEdit(choice : any) {
      let dialogRef = this.dialog.open(ChoiceFormComponent, {
          data: choice,
          width: '600px',
      });
      dialogRef.afterClosed().subscribe(() => {
          this.getChoices();
      })
  }
}

