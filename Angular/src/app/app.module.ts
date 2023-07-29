import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WorkWeekService,
  MonthService,
} from '@syncfusion/ej2-angular-schedule';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { UsersComponent } from './users/users/users.component';
import { ViewUsersComponent } from './users/users/viewUsers/view-users/view-users.component';
import { ViewUserRolesComponent } from './users/users/viewUserRoles/view-user-roles/view-user-roles.component';
import { PropertiesComponent } from './properties/properties/properties.component';
import { ViewPropertiesComponent } from './properties/properties/viewProperties/view-properties/view-properties.component';
import { GeneratePropertiesReportComponent } from './properties/properties/generatePropertiesReport/generate-properties-report/generate-properties-report.component';
import { TenantsComponent } from './tenants/tenants/tenants.component';
import { HomeComponent } from './home/home/home.component';
import { ViewTenantsComponent } from './tenants/tenants/viewTenants/view-tenants/view-tenants.component';
import { GenerateTenantsReportComponent } from './tenants/tenants/generateTenantsReport/generate-tenants-report/generate-tenants-report.component';
import { ContractorsComponent } from './contractors/contractors/contractors.component';
import { ViewContractorsComponent } from './contractors/contractors/viewContractors/view-contractors/view-contractors.component';
import { GenerateContractReportComponent } from './contractors/contractors/generateContractorReport/generate-contract-report/generate-contract-report.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { ViewEmployeeComponent } from './employee/employee/viewEmployee/view-employee/view-employee.component';
import { BrokerComponent } from './broker/broker/broker.component';
import { ViewBrokerComponent } from './broker/broker/viewBroker/view-broker/view-broker.component';
import { GenerateBrokerReportComponent } from './broker/broker/generateBrokerReport/generate-broker-report/generate-broker-report.component';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { ViewCalendarComponent } from './calendar/calendar/viewCalendar/view-calendar/view-calendar.component';
import { GenerateCalendarReportComponent } from './calendar/calendar/generateCalendarReport/generate-calendar-report/generate-calendar-report.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { MaintenanceComponent } from './maintenance/maintenance/maintenance.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AssignMaintenanceComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/assign-maintenance.component';
import { PaymentComponent } from './maintenance/maintenance/payment/payment/payment.component';
import { MaintenanceNoteComponent } from './maintenance/maintenance/maintenanceNote/maintenance-note/maintenance-note.component';
import { GenerateMaintenanceReportComponent } from './maintenance/maintenance/generateMaintenanceReport/generate-maintenance-report/generate-maintenance-report.component';
import { ChangePasswordComponent } from './profile/profile/changePassword/change-password/change-password.component';
import { NotificationsComponent } from './profile/profile/notifications/notifications/notifications.component';
import { ViewProfileComponent } from './profile/profile/viewProfile/view-profile/view-profile.component';
import { HelpproComponent } from './profile/profile/help/helppro/helppro.component';
import { CreateURModalComponent } from './users/users/createURModal/create-urmodal/create-urmodal.component';
import { CreateUModalComponent } from './users/users/createUModal/create-umodal/create-umodal.component';
import { CreatePropertiesModalComponent } from './properties/properties/create-properties-modal/create-properties-modal.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { DeletePropertyDialogComponent } from './properties/properties/viewProperties/view-properties/deletePropertyDialog/delete-property-dialog/delete-property-dialog.component';
import { DeleteTenantDialogComponent } from './properties/properties/viewProperties/view-properties/delete-tenant-dialog/delete-tenant-dialog.component';
import { DeleteInspectionDialogComponent } from './properties/properties/viewProperties/view-properties/delete-inspection-dialog/delete-inspection-dialog.component';
import { DeleteRecoveriesDialogComponent } from './properties/properties/viewProperties/view-properties/deleteRecoveriesDialog/delete-recoveries-dialog/delete-recoveries-dialog.component';
import { AddRecoveriesModalComponent } from './properties/properties/viewProperties/view-properties/addRecoveriesModal/add-recoveries-modal/add-recoveries-modal.component';
import { AddInspectionModalComponent } from './properties/properties/viewProperties/view-properties/addInspectionModal/add-inspection-modal/add-inspection-modal.component';
import { AddTenantModalComponent } from './properties/properties/viewProperties/view-properties/addTenantModal/add-tenant-modal/add-tenant-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ViewUsersComponent,
    ViewUserRolesComponent,
    PropertiesComponent,
    ViewPropertiesComponent,
    GeneratePropertiesReportComponent,
    TenantsComponent,
    HomeComponent,
    ViewTenantsComponent,
    GenerateTenantsReportComponent,
    ContractorsComponent,
    ViewContractorsComponent,
    GenerateContractReportComponent,
    EmployeeComponent,
    ViewEmployeeComponent,
    BrokerComponent,
    ViewBrokerComponent,
    GenerateBrokerReportComponent,
    CalendarComponent,
    ViewCalendarComponent,
    GenerateCalendarReportComponent,
    SettingsComponent,
    MaintenanceComponent,
    ProfileComponent,
    AssignMaintenanceComponent,
    PaymentComponent,
    MaintenanceNoteComponent,
    GenerateMaintenanceReportComponent,
    ChangePasswordComponent,
    NotificationsComponent,
    ViewProfileComponent,
    HelpproComponent,
    CreateURModalComponent,
    CreateUModalComponent,
    CreatePropertiesModalComponent,
    ForgotPasswordComponent,
    DeletePropertyDialogComponent,
    DeleteTenantDialogComponent,
    DeleteInspectionDialogComponent,
    DeleteRecoveriesDialogComponent,
    AddRecoveriesModalComponent,
    AddInspectionModalComponent,
    AddTenantModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ScheduleModule,
    RecurrenceEditorModule,
  ],
  providers: [DayService, WorkWeekService, MonthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
