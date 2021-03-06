import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamMembers } from '@core/model/teammembers';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  localData: TeamMembers;
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: TeamMembers) {
      console.log(data);
      this.localData = {...data};
      this.action = this.localData.action;
    }

    doAction(){
      this.dialogRef.close({event: this.action, data: this.localData});
    }

    closeDialog(){
      this.dialogRef.close({event: 'Cancel'});
    }

    ngOnInit(): void {
    }
}
