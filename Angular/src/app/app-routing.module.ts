import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Home
import { HomeComponent } from './home/home/home.component';
//Users
import { UsersComponent } from './users/users/users.component';
import { ViewUsersComponent } from './users/users/viewUsers/view-users/view-users.component';
import { ViewUserRolesComponent } from './users/users/viewUserRoles/view-user-roles/view-user-roles.component';
//Login
import { LoginComponent } from './login/login/login.component';
//Properties
import { PropertiesComponent } from './properties/properties/properties.component';
import { ViewPropertiesComponent } from './properties/properties/viewProperties/view-properties/view-properties.component';
import { GeneratePropertiesReportComponent } from './properties/properties/generatePropertiesReport/generate-properties-report/generate-properties-report.component';
import { ViewAllPropertiesComponent } from './properties/properties/view-all-properties/view-all-properties.component';
import { MapPropertiesComponent } from './properties/properties/map-properties/map-properties.component';
import { AddInspectionModalComponent } from './properties/properties/viewProperties/view-properties/addInspectionModal/add-inspection-modal/add-inspection-modal.component';
//Tenants
import { TenantsComponent } from './tenants/tenants/tenants.component';
import { ViewTenantsComponent } from './tenants/tenants/viewTenants/view-tenants/view-tenants.component';
import { GenerateTenantsReportComponent } from './tenants/tenants/generateTenantsReport/generate-tenants-report/generate-tenants-report.component';
//Contractors
import { ContractorsComponent } from './contractors/contractors/contractors.component';
import { ViewContractorsComponent } from './contractors/contractors/viewContractors/view-contractors/view-contractors.component';
import { GenerateContractReportComponent } from './contractors/contractors/generateContractorReport/generate-contract-report/generate-contract-report.component';
import { ContractorTreeComponent } from './contractors/contractors/contractorTree/contractor-tree/contractor-tree.component';
//Employee
import { EmployeeComponent } from './employee/employee/employee.component';
import { ViewEmployeeComponent } from './employee/employee/viewEmployee/view-employee/view-employee.component';
import { GenerateEmployeeReportComponent } from './employee/employee/generateEmployeeReport/generate-employee-report/generate-employee-report.component';
//Broker
import { BrokerComponent } from './broker/broker/broker.component';
import { ViewBrokerComponent } from './broker/broker/viewBroker/view-broker/view-broker.component';
import { GenerateBrokerReportComponent } from './broker/broker/generateBrokerReport/generate-broker-report/generate-broker-report.component';
//Calendar
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { ViewCalendarComponent } from './calendar/calendar/viewCalendar/view-calendar/view-calendar.component';
import { GenerateCalendarReportComponent } from './calendar/calendar/generateCalendarReport/generate-calendar-report/generate-calendar-report.component';
//Maintenace
import { MaintenanceComponent } from './maintenance/maintenance/maintenance.component';
import { AssignMaintenanceComponent } from './maintenance/maintenance/assignMaintenance/assign-maintenance/assign-maintenance.component';
import { PaymentComponent } from './maintenance/maintenance/payment/payment/payment.component';
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

const routes: Routes = [
  //Home
  { path: 'home', component: HomeComponent },
  //Users
  { path: 'users', component: UsersComponent },
  { path: 'viewUsers', component: ViewUsersComponent },
  { path: 'viewUserRoles', component: ViewUserRolesComponent },
  //Login
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  //Properties
  { path: 'properties', component: PropertiesComponent },
  { path: 'viewProperties/:id', component: ViewPropertiesComponent },
  { path: 'generateProperties', component: GeneratePropertiesReportComponent },
  { path: 'viewAllProperties', component: ViewAllPropertiesComponent },
  { path: 'mapProperties', component: MapPropertiesComponent},
  { path: 'addInspection', component: AddInspectionModalComponent},
  { path: 'addRecoveries', component: AddRecoveriesModalComponent},
  //Tenants
  { path: 'tenants', component: TenantsComponent },
  { path: 'viewTenants', component: ViewTenantsComponent },
  { path: 'generateTenants', component: GenerateTenantsReportComponent },
  //Contractors
  { path: 'contractors', component: ContractorsComponent },
  { path: 'viewContractors', component: ViewContractorsComponent },
  { path: 'generateContractors', component: GenerateContractReportComponent },
  { path: 'contractorTree', component: ContractorTreeComponent },
  { path: 'view-contractor-details/:id',component: ViewContractorDetailsComponent },
  //Employee
  { path: 'employee', component: EmployeeComponent },
  { path: 'viewEmployees', component: ViewEmployeeComponent },
  { path: 'generateEmployees', component: GenerateEmployeeReportComponent },
  //Broker
  { path: 'broker', component: BrokerComponent },
  { path: 'viewBroker', component: ViewBrokerComponent },
  { path: 'generateBroker', component: GenerateBrokerReportComponent },
  { path: 'viewBrokerDetails/:id', component: ViewBrokerDetailsComponent },
  //Calendar
  { path: 'calendar', component: CalendarComponent },
  { path: 'viewCalendar', component: ViewCalendarComponent },
  { path: 'generateCalendar', component: GenerateCalendarReportComponent },
  //Maintenace
  {path: 'maintenance', component:MaintenanceComponent},
  {path: 'assignMaintenance', component:AssignMaintenanceComponent},
  {path: 'payment', component:PaymentComponent},
  {path: 'maintenanceNote', component:MaintenanceNoteComponent},
  {path: 'generateMaintenance', component:GenerateMaintenanceReportComponent},
  //Profile
  { path: 'profile', component: ProfileComponent },
  { path: 'viewProfile', component: ViewProfileComponent },
  { path: 'password', component: ChangePasswordComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'help', component: HelpproComponent },
  //Chatbot
  { path: 'chatbot', component: ChatbotComponent},
  //Leases
  { path: 'viewLeases', component: ViewLeasesComponent },
  //Problems
  { path: 'problemsPage/:id', component: ProblemsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule {}
