import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateURModalComponent } from '../../createURModal/create-urmodal/create-urmodal.component';
import { DeleteUserRoleDialogComponent } from './deleteUserRoleDialog/delete-user-role-dialog/delete-user-role-dialog.component';
import { UpdateUserRoleModalComponent } from './updateUserRoleModal/update-user-role-modal/update-user-role-modal.component';
import { UserService } from 'src/app/services/user.service';
import { KRole } from 'src/app/shared/UserModels/KRole';

NgModule({
  imports: [MatDialogModule, FormsModule, MatInputModule, MatButtonModule],
});

export interface DialogData {
  id: number;
  roleName: string;
  accessLevel: string;
}

interface Role {
  id: number;
  roleName: string;
  accessLevel: string;
}

@Component({
  selector: 'app-view-user-roles',
  templateUrl: './view-user-roles.component.html',
  styleUrls: ['./view-user-roles.component.scss'],
})
export class ViewUserRolesComponent implements OnInit {
  UserId: number = parseInt(localStorage.getItem('UserId') || '0', 10);
  roles: KRole[] = [];

  constructor(public dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {
    this.LoadUserInfo();
  }
  LoadUserInfo() {
    this._userService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  // openDialog(
  //   enterAnimationDuration: string,
  //   exitAnimationDuration: string
  // ): void {
  //   this.dialog.open(ViewUserRolesComponent, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  // //Create Modal
  openModal(): void {
    const dialogRef = this.dialog.open(CreateURModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newRole: KRole = {
          roleID: this.roles.length + 1,
          name: result.roleName,
        };
        this.roles.push(newRole);
        this.search();
      }
    });
  }

  // //Delete Dialog
  // openDeleteUserDialog(role: Role): void {
  //   const dialogRef = this.dialog.open(DeleteUserRoleDialogComponent, {
  //     width: '300px',
  //     data: role,
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'delete') {
  //       this.role = this.role.filter((u) => u.id !== role.id);
  //       this.filtered = this.filtered.filter((u) => u.id !== role.id);
  //     }
  //   });
  // }

  // //Update Modal
  // openUpdateUserRoleModal(role: Role): void {
  //   const dialogRef = this.dialog.open(UpdateUserRoleModalComponent, {
  //     data: role,
  //   });

  //   dialogRef.componentInstance.roleUpdated.subscribe((updatedRole: Role) => {
  //     const index = this.role.findIndex((u) => u.id === updatedRole.id);
  //     if (index !== -1) {
  //       this.role[index] = updatedRole;
  //       this.filtered = this.role.filter((u) =>
  //         u.roleName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //       );
  //     }
  //   });
  // }

  // //Search
  searchTerm: string = '';
  filtered: KRole[] = [];

  search() {
    this.filtered = this.roles.filter((u) => {
      const searchLower = this.searchTerm.toLowerCase();
      const roleNameLower = u.name.toLowerCase(); // Use 'roleName', not 'role'
      return roleNameLower.includes(searchLower);
    });
  }
}
