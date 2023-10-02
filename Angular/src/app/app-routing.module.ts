import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Home
import { HomeComponent } from './home/home/home.component';
//Users
import { UsersComponent } from './users/users/users.component';
import { ViewUsersComponent } from './users/users/viewUsers/view-users/view-users.component';
import { ViewUserRolesComponent } from './users/users/viewUserRoles/view-user-roles/view-user-roles.component';
//Properties
import { PropertiesComponent } from './properties/properties/properties.component';
import { ViewPropertiesComponent } from './properties/properties/viewProperties/view-properties/view-properties.component';
import { GeneratePropertiesReportComponent } from './properties/properties/generatePropertiesReport/generate-properties-report/generate-properties-report.component';
import { ViewAllPropertiesComponent } from './properties/properties/view-all-properties/view-all-properties.component';
import { MapPropertiesComponent } from './properties/properties/map-properties/map-properties.component';
import { AddInspectionModalComponent } from './properties/properties/viewProperties/view-properties/addInspectionModal/add-inspection-modal/add-inspection-modal.component';
import { SnagListComponent } from './properties/properties/snag-list/snag-list.component';

//Tenants
import { TenantsComponent } from './tenants/tenants/tenants.component';
import { ViewTenantsComponent } from './tenants/tenants/viewTenants/view-tenants/view-tenants.component';
import { GenerateTenantsReportComponent } from './tenants/tenants/generateTenantsReport/generate-tenants-report/generate-tenants-report.component';

//Contractors
import { ContractorsComponent } from './contractors/contractors/contractors.component';
import { ViewContractorsComponent } from './contractors/contractors/viewContractors/view-contractors/view-contractors.component';
import { GenerateContractReportComponent } from './contractors/contractors/generateContractorReport/generate-contract-report/generate-contract-report.component';
import { ContractorTreeComponent } from './contractors/contractors/contractorTree/contractor-tree/contractor-tree.component';
import { ContractorDetailsComponent } from './contractors/contractors/viewContractors/view-contractors/contractorDetails/contractor-details/contractor-details.component';
//Employee
import { EmployeeComponent } from './employee/employee/employee.component';
import { ViewEmployeeComponent } from './employee/employee/viewEmployee/view-employee/view-employee.component';
import { GenerateEmployeeReportComponent } from './employee/employee/generateEmployeeReport/generate-employee-report/generate-employee-report.component';
import { EmployeeDetailsComponent } from './employee/employee/viewEmployee/view-employee/employeeDetails/employee-details/employee-details.component';
//Broker
import { BrokerComponent } from './broker/broker/broker.component';
import { ViewBrokerComponent } from './broker/broker/viewBroker/view-broker/view-broker.component';
import { GenerateBrokerGraphComponent } from './broker/broker/generateBrokerGraph/generate-broker-graph/generate-broker-graph.component';
import { GenerateBrokerReportComponent } from './broker/broker/generateBrokerReport/generate-broker-report/generate-broker-report.component';
//Calendar
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { ViewCalendarComponent } from './calendar/calendar/viewCalendar/view-calendar/view-calendar.component';
import { GenerateCalendarReportComponent } from './calendar/calendar/generateCalendarReport/generate-calendar-report/generate-calendar-report.component';
//Maintenace
import { MaintenanceComponent } from './maintenance/maintenance/maintenance.component';
import { AssignMaintenanceComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/assign-maintenance.component';
import { PaymentComponent } from './maintenance/maintenance/payment/payment/payment.component';
import { MaintenanceTypeComponent } from './maintenance/maintenance/maintenance-type/maintenance-type.component';
import { ViewMaintenanceComponent } from './maintenance/maintenance/maintenance/maintenance.component';
import { MaintenanceStatusComponent } from './maintenance/maintenance/maintenance-status/maintenance-status.component';
import { MaintenanceNoteComponent } from './maintenance/maintenance/maintenanceNote/maintenance-note/maintenance-note.component';
import { GenerateMaintenanceReportComponent } from './maintenance/maintenance/generateMaintenanceReport/generate-maintenance-report/generate-maintenance-report.component';
//Profile
import { ProfileComponent } from './profile/profile/profile.component';
import { ViewProfileComponent } from './profile/profile/viewProfile/view-profile/view-profile.component';
import { ChangePasswordComponent } from './profile/profile/changePassword/change-password/change-password.component';
import { NotificationsComponent } from './profile/profile/notifications/notifications/notifications.component';
import { HelpproComponent } from './profile/profile/help/helppro/helppro.component';
import { ViewBrokerDetailsComponent } from './broker/broker/viewBroker/view-broker/viewBrokerDetailsComponent/viewBrokerDetailsComponent';
//Chatbot
import { ChatbotComponent } from './chatbot/chatbot/chatbot.component';
import { ViewLeasesComponent } from './leases/view-leases/view-leases.component';
import { AddRecoveriesModalComponent } from './properties/properties/viewProperties/view-properties/addRecoveriesModal/add-recoveries-modal/add-recoveries-modal.component';
import { ProblemsPageComponent } from './properties/properties/viewProperties/view-properties/problems/problems-page/problems-page.component';
import { ViewContractorDetailsComponent } from './contractors/contractors/viewContractors/view-contractors/view-contractor-details/view-contractor-details.component';
import { TenantDetailsComponent } from './tenants/tenants/viewTenants/view-tenants/tenantDetails/tenant-details/tenant-details.component';
import { LoginComponent } from './authentication/Login/login.component';
//Screensaver
import { ScreensaverComponent } from './screensaver/screensaver/screensaver.component';
//Signature
import { SignaturePadComponent } from './signaturePad/signature-pad/signature-pad.component';
//Calculator
import { CalculatorComponent } from './calculator/calculator/calculator.component';


//Add AuthGuard for Route Protection
import {
  AuthGuardService as AuthGuard,
  AuthGuardService,
} from './authentication/authGuardService/authGuardService';
import { AuthService } from './authentication/authGuardService/authService';
import {
  JwtHelperService,
  JwtModule,
  JwtModuleOptions,
} from '@auth0/angular-jwt';
import { RoleGuardService as RoleGuard } from './authentication/authGuardService/RoleguardService';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UpdateProfileDetailsComponent } from './authentication/UpdateProfileDetails/update-profile-details/update-profile-details.component';

import { HelpFAQComponent } from './help-faq/help-faq.component';

import { SnagListItemsComponent } from './properties/properties/snag-list/snag-list-items/snag-list-items.component';
import { TypesStatusesComponent } from './properties/types-statuses/types-statuses/types-statuses.component';
import { AccessDeniedComponent } from './authentication/AccessDenied/access-denied/access-denied.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  //UpdateUser
  {
    path: 'UpdateNewUser',
    component: UpdateProfileDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Home
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //SignaturePad
  {
    path: 'signaturePad',
    component: SignaturePadComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
   //Calculator
   {
    path: 'calculator',
    component: CalculatorComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Screensaver
  {
    path: 'screensaver',
    component: ScreensaverComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'brokerGraph',
    component: GenerateBrokerGraphComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Users
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewUsers',
    component: ViewUsersComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewUserRoles',
    component: ViewUserRolesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Properties
  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewProperties/:id',
    component: ViewPropertiesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateProperties',
    component: GeneratePropertiesReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewAllProperties',
    component: ViewAllPropertiesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'mapProperties',
    component: MapPropertiesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'typesStatuses',
    component: TypesStatusesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'addInspection',
    component: AddInspectionModalComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'addRecoveries',
    component: AddRecoveriesModalComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'SnagList',
    component: SnagListComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
   },
  {
    path: 'SnagListItem',
    component: SnagListItemsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Tenants
  {
    path: 'tenants',
    component: TenantsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewTenants',
    component: ViewTenantsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateTenants',
    component: GenerateTenantsReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'tenantDetails/:id',
    component: TenantDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'contractors',
    component: ContractorsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewContractors',
    component: ViewContractorsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateContractors',
    component: GenerateContractReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'contractorTree',
    component: ContractorTreeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'contractorDetails/:id',
    component: ContractorDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'view-contractor-details/:id',
    component: ViewContractorDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Employee
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewEmployees',
    component: ViewEmployeeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateEmployees',
    component: GenerateEmployeeReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'employeeDetails/:id',
    component: EmployeeDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Broker
  {
    path: 'broker',
    component: BrokerComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewBroker',
    component: ViewBrokerComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateBroker',
    component: GenerateBrokerReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewBrokerDetails/:id',
    component: ViewBrokerDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Calendar
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewCalendar',
    component: ViewCalendarComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateCalendar',
    component: GenerateCalendarReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Maintenace
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'MaintenanceDetail',
    component: AssignMaintenanceComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewMaintenance',
    component: ViewMaintenanceComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'maintenanceNote',
    component: MaintenanceNoteComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'maintenanceType',
    component: MaintenanceTypeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'maintenanceStatus',
    component: MaintenanceStatusComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'generateMaintenance',
    component: GenerateMaintenanceReportComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Profile
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'viewProfile',
    component: ViewProfileComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'password',
    component: ChangePasswordComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'help',
    component: HelpproComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Chatbot
  {
    path: 'chatbot',
    component: ChatbotComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Leases
  {
    path: 'viewLeases',
    component: ViewLeasesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  //Problems
  {
    path: 'problemsPage/:id',
    component: ProblemsPageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },

  //help
  {
    path: 'help-faq',
    component: HelpFAQComponent,
    canActivate:[RoleGuard],
    data: {
      expectedRole: 'Admin',
    },
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  { path: 'access-denied', component: AccessDeniedComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService, JwtHelperService],
})
export class AppRoutingModule {}
