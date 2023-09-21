import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
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
import { CreateUserModalComponent } from './users/users/CreateUserModal/createUModal/create-umodal/create-umodal.component';
import { CreatePropertiesModalComponent } from './properties/properties/create-properties-modal/create-properties-modal.component';
import { ForgotPasswordComponent } from './forgotPassword/forgot-password/forgot-password.component';
import { DeletePropertyDialogComponent } from './properties/properties/viewProperties/view-properties/deletePropertyDialog/delete-property-dialog/delete-property-dialog.component';
import { DeleteTenantDialogComponent } from './properties/properties/viewProperties/view-properties/delete-tenant-dialog/delete-tenant-dialog.component';
import { DeleteInspectionDialogComponent } from './properties/properties/viewProperties/view-properties/delete-inspection-dialog/delete-inspection-dialog.component';
import { DeleteRecoveriesDialogComponent } from './properties/properties/viewProperties/view-properties/deleteRecoveriesDialog/delete-recoveries-dialog/delete-recoveries-dialog.component';
import { AddRecoveriesModalComponent } from './properties/properties/viewProperties/view-properties/addRecoveriesModal/add-recoveries-modal/add-recoveries-modal.component';
import { AddInspectionModalComponent } from './properties/properties/viewProperties/view-properties/addInspectionModal/add-inspection-modal/add-inspection-modal.component';
import { AddTenantModalComponent } from './properties/properties/viewProperties/view-properties/addTenantModal/add-tenant-modal/add-tenant-modal.component';
import { AddImageModalComponent } from './properties/properties/viewProperties/view-properties/addImageModal/add-image-modal/add-image-modal.component';
import { DeleteImageDialogComponent } from './properties/properties/viewProperties/view-properties/deleteImageDialog/delete-image-dialog/delete-image-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './NavBars/Side-Nav/side-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { ViewBrokerDetailsComponent } from './broker/broker/viewBroker/view-broker/viewBrokerDetailsComponent/viewBrokerDetailsComponent';
import { BrokercreatemodelComponent } from './broker/broker/viewBroker/view-broker/brokercreatemodel/brokercreatemodel.component';
import { DeleteUserDialogComponent } from './users/users/viewUsers/view-users/deleteUserDialog/delete-user-dialog/delete-user-dialog.component';
import { DeleteUserRoleDialogComponent } from './users/users/viewUserRoles/view-user-roles/deleteUserRoleDialog/delete-user-role-dialog/delete-user-role-dialog.component';
import { UpdateUserModalComponent } from './users/users/viewUsers/view-users/updateUserModal/update-user-modal/update-user-modal.component';
import { CreateBrokerModalModule } from './broker/broker/viewBroker/view-broker/CreateBroker/create-broker-modal.module';
import { UpdateUserRoleModalComponent } from './users/users/viewUserRoles/view-user-roles/updateUserRoleModal/update-user-role-modal/update-user-role-modal.component';
import { CreateEmployeeModalComponent } from './employee/employee/viewEmployee/view-employee/createEmployeeModal/create-employee-modal/create-employee-modal.component';
import { DeleteEmployeeDialogComponent } from './employee/employee/viewEmployee/view-employee/deleteEmployeeDialog/delete-employee-dialog/delete-employee-dialog.component';
import { UpdateTenantModalComponent } from './tenants/tenants/viewTenants/view-tenants/updateTenantModal/update-tenant-modal.component';
import { UpdateEmployeeModalComponent } from './employee/employee/viewEmployee/view-employee/updateEmployeeModal/update-employee-modal/update-employee-modal.component';
import { ViewAllPropertiesComponent } from './properties/properties/view-all-properties/view-all-properties.component';
import { CreateContractorModalComponent } from './contractors/contractors/viewContractors/view-contractors/createContractorModal/create-contractor-modal/create-contractor-modal.component';
import { DeleteContracorDialogComponent } from './contractors/contractors/viewContractors/view-contractors/deleteContractorDialog/delete-contracor-dialog/delete-contracor-dialog.component';
import { UpdateContractorModalComponent } from './contractors/contractors/viewContractors/view-contractors/updateContractorModal/update-contractor-modal/update-contractor-modal.component';
import { AssignMaintenanceModalComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/assignMaintenanceModal/assign-maintenance-modal/assign-maintenance-modal.component';
import { DeleteMaintenanceDialogComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/deleteMaintenanceDialog/delete-maintenance-dialog/delete-maintenance-dialog.component';
import { UpdateMiaintenanceModalComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/updateMaintenanceModal/update-miaintenance-modal/update-miaintenance-modal.component';
import { CreateTenantModalComponent } from './tenants/tenants/viewTenants/view-tenants/createTenantModal/create-tenant-modal/create-tenant-modal.component';
import { TenantDetailsComponent } from './tenants/tenants/viewTenants/view-tenants/tenantDetails/tenant-details/tenant-details.component';
import { ContractorTreeComponent } from './contractors/contractors/contractorTree/contractor-tree/contractor-tree.component';
import { GenerateEmployeeReportComponent } from './employee/employee/generateEmployeeReport/generate-employee-report/generate-employee-report.component';
import { ChatbotComponent } from './chatbot/chatbot/chatbot.component';
import { RecordPaymentComponent } from './maintenance/maintenance/payment/record-payment/record-payment.component';
import { MaintenanceTypeComponent } from './maintenance/maintenance/maintenance-type/maintenance-type.component';
import { AddMaintenanceTypeComponent } from './maintenance/maintenance/maintenance-type/add-maintenance-type/add-maintenance-type.component';
import { MaintenanceStatusComponent } from './maintenance/maintenance/maintenance-status/maintenance-status.component';
import { AddMaintenanceStatusComponent } from './maintenance/maintenance/maintenance-status/add-maintenance-status/add-maintenance-status.component';
import { AddMaintenanceNoteComponent } from './maintenance/maintenance/maintenanceNote/add-maintenance-note/add-maintenance-note.component';
import { AddMaintenanceComponent } from './maintenance/maintenance/maintenance/add-maintenance/add-maintenance.component';
import { EditMaintenanceComponent } from './maintenance/maintenance/maintenance/edit-maintenance/edit-maintenance.component';
import { ViewMaintenanceComponent } from './maintenance/maintenance/maintenance/maintenance.component';
import { MaintenanceContractorComponent } from './maintenance/maintenance/maintenance/maintenance-contractor/maintenance-contractor.component';
import{EditMaintenanceNoteComponent} from './maintenance/maintenance/maintenanceNote/edit-maintenance-note/edit-maintenance-note.component';
import { EditMaintenanceStatusComponent } from './maintenance/maintenance/maintenance-status/edit-maintenance-status/edit-maintenance-status.component';
import { EditMaintenanceTypeComponent } from './maintenance/maintenance/maintenance-type/edit-maintenance-type/edit-maintenance-type.component';
import { EditPaymentComponent } from './maintenance/maintenance/payment/edit-payment/edit-payment.component';

//TRYING MAP STUFF
import { MapPropertiesComponent } from './properties/properties/map-properties/map-properties.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GoogleMapsModule } from '@angular/google-maps';
import { ViewLeasesComponent } from './leases/view-leases/view-leases.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProblemsPageComponent } from './properties/properties/viewProperties/view-properties/problems/problems-page/problems-page.component';

import { DeleteBrokerModelComponent } from './broker/broker/viewBroker/view-broker/delete-broker-model/delete-broker-model.component';

import { UpdateInspectionModalComponent } from './properties/properties/viewProperties/view-properties/update-inspection-modal/update-inspection-modal.component';
import { DatePipe } from '@angular/common';
import { ContractorDetailsComponent } from './contractors/contractors/viewContractors/view-contractors/contractorDetails/contractor-details/contractor-details.component';
import { AddLeaseModalComponent } from './leases/add-lease-modal/add-lease-modal.component';
import { DeleteLeaseDialogComponent } from './leases/delete-lease-dialog/delete-lease-dialog.component';
import { AddDepositDialogComponent } from './leases/add-deposit-dialog/add-deposit-dialog.component';

//CALENDAR STUFF
import {
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeeDetailsComponent } from './employee/employee/viewEmployee/view-employee/employeeDetails/employee-details/employee-details.component';
import { ViewContractorDetailsComponent } from './contractors/contractors/viewContractors/view-contractors/view-contractor-details/view-contractor-details.component';

import { SafePipe } from './shared/safe.pipe';
import { LoginComponent } from './authentication/Login/login.component';
import { LoginFailedComponent } from './authentication/Login/login-failed/login-failed.component';
import { UpdateProfileDetailsComponent } from './authentication/UpdateProfileDetails/update-profile-details/update-profile-details.component';
import { MatIconModule } from '@angular/material/icon';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardService } from './authentication/authGuardService/authGuardService';
import { RoleGuardService } from './authentication/authGuardService/RoleguardService';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('Token');
}

export function jwtOptionsFactory() {
  return {
    tokenGetter,
    authScheme: 'Bearer',
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ViewUsersComponent,
    ViewUserRolesComponent,
    ViewBrokerDetailsComponent,
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
    CreateUserModalComponent,
    CreatePropertiesModalComponent,
    ForgotPasswordComponent,
    DeletePropertyDialogComponent,
    DeleteTenantDialogComponent,
    DeleteInspectionDialogComponent,
    DeleteRecoveriesDialogComponent,
    AddInspectionModalComponent,
    AddTenantModalComponent,
    AddImageModalComponent,
    DeleteImageDialogComponent,
    SideNavComponent,
    BrokercreatemodelComponent,
    DeleteUserDialogComponent,
    DeleteUserRoleDialogComponent,
    UpdateUserModalComponent,
    UpdateUserRoleModalComponent,
    CreateEmployeeModalComponent,
    DeleteEmployeeDialogComponent,
    UpdateEmployeeModalComponent,
    UpdateTenantModalComponent,
    ViewAllPropertiesComponent,
    CreateContractorModalComponent,
    DeleteContracorDialogComponent,
    UpdateContractorModalComponent,
    AssignMaintenanceModalComponent,
    DeleteMaintenanceDialogComponent,
    UpdateMiaintenanceModalComponent,
    CreateTenantModalComponent,
    TenantDetailsComponent,
    ContractorTreeComponent,
    GenerateEmployeeReportComponent,
    ChatbotComponent,
    MapPropertiesComponent,
    ViewLeasesComponent,
    AddRecoveriesModalComponent,
    ProblemsPageComponent,
    DeleteBrokerModelComponent,
    UpdateInspectionModalComponent,
    ContractorDetailsComponent,
    EmployeeDetailsComponent,
    ViewContractorDetailsComponent,
    RecordPaymentComponent,
    MaintenanceTypeComponent,
    AddMaintenanceTypeComponent,
    MaintenanceStatusComponent,
    AddMaintenanceStatusComponent,
    AddMaintenanceNoteComponent,
    AddMaintenanceComponent,
    EditMaintenanceComponent,
    ViewMaintenanceComponent,
    MaintenanceContractorComponent,
    EditMaintenanceNoteComponent,
    EditMaintenanceStatusComponent,
    EditMaintenanceTypeComponent,
    EditPaymentComponent,
    AddLeaseModalComponent,
    DeleteLeaseDialogComponent,
    AddDepositDialogComponent,
    SafePipe,
    UpdateProfileDetailsComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CreateBrokerModalModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    LoginFailedComponent,
    MatTableModule,
    //MAP STUFF
    LeafletModule, 
    GoogleMapsModule,
    SlickCarouselModule,
    //CALENDAR
    ScheduleModule,
    FullCalendarModule,
    MatIconModule,
    /*JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),*/
  ],
  providers: [
    AuthGuardService,
    RoleGuardService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'en-ZA' },
    [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
