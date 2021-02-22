import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Choice } from 'src/app/models/choice.model';
import { ChoiceService } from 'src/app/services/choice.service';

@Component({
  selector: 'app-choice-form',
  templateUrl: './choice-form.component.html',
  styleUrls: ['./choice-form.component.scss']
})
export class ChoiceFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public choice: Choice, public snackBar: MatSnackBar, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<ChoiceFormComponent>, public choiceService: ChoiceService) { }

  onAdd = new EventEmitter();
  isUpdate : boolean = false;
  //@ts-ignore
  choiceAddForm: FormGroup;

  ngOnInit() {
      if (this.choice != null) {
        this.isUpdate = true;
          this.choiceAddForm = this._formBuilder.group({
              title: [this.choice.Title, Validators.required],
              choiceID: [this.choice.Id],
          });
      }
      else {
          this.choiceAddForm = this._formBuilder.group({
              title: ['', Validators.required],
              choiceID: [0],
          });
      }
}


  onNoClick(): void {
      this.dialogRef.close();
  }

  submitChoice() {
    if(this.isUpdate){
      this.choiceService.updateChoice(this.choiceAddForm);
       //@ts-ignore
      this.snackBar.open("✅ Choice successfully updated ✅", null, {
          duration: 3000,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
    else{
       this.choiceService.addChoice(this.choiceAddForm);
      //@ts-ignore
     this.snackBar.open("✅ Choice successfully created✅", null, {
         duration: 3000,
     });
     this.dialogRef.close();
     this.onAdd.emit();

    }
  }
}
