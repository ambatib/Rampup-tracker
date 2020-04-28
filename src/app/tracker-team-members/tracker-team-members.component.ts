import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { TeamMembers } from '../model/teammembers';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-tracker-team-members',
  templateUrl: './tracker-team-members.component.html',
  styleUrls: ['./tracker-team-members.component.css']
})
export class TrackerTeamMembersComponent implements OnInit {

  teammembers: TeamMembers[] = [];
  tableColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'email', 'action'];
  highlightedRow = [];
  id: number ;
  @ViewChild(MatTable) mytable: MatTable<TeamMembers>;

  constructor(public dataService: DataService,
              public dialog: MatDialog) {
   }

  ngOnInit() {
    this.dataService.getAllTeamMembers().subscribe((data: TeamMembers[]) => {
      this.teammembers = data;
    });
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add'){
        this.addMember(result.data);
      }else if (result.event === 'Update'){
        this.updateMember(result.data);
      }else if (result.event === 'Delete'){
        this.deleteMember(result.data);
      }
    });
  }

  addMember(rowObj){
    console.log(rowObj);
    this.dataService.addTeamMember(rowObj).subscribe(() => {
      this.ngOnInit();
      console.log('Team Member added');
    });
    console.log(this.mytable.dataSource);
    this.mytable.renderRows();
  }

  updateMember(rowObj: TeamMembers){
    this.dataService.update(rowObj.id, rowObj).subscribe(() => {
      this.ngOnInit();
      console.log('Team Member updated');
    });
  }

  deleteMember(rowObj){
    this.dataService.deleteMember(rowObj.id).subscribe(() => {
      this.ngOnInit();
      console.log('Team Member Deleted');
    });
  }

}
