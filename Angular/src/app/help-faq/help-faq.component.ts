import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router} from '@angular/router';

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss']
})
export class HelpFAQComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // Define your FAQ data hereok
  faqData: FaqEntry[] = [
    {
      question: 'How to create a new user for the system?',
      answer: 'To create a new user, log in as an administrator with the necessary permissions...',
    },
    {
      question: 'How to add a property?',
      answer: 'Access the "View Properties" section in the system under “Properties” in the navigation bar...',
    },
    {
      question: 'How to add a new broker',
      answer: 'Access the "View Brokers" section in the system from the “Broker” section in the navigation bar. Click on "Create Broker" and fill in the broker\'s details, including name, surname, contact information such as phone number and email, license number and the brokers commission rate.'
  },
  {
      question: 'How to add a new contractor',
      answer: 'Access the "View Contractors" section in the system from the “Contractors” section in the navigation bar. Click on "Add New Contractor" and fill in the Contractor\'s details, including name, surname, contact information such as phone number and email and the area of business, availability and contractor type. Save the contractor information once the form is complete.'
  },
  {
      question: 'How to add a new tenant',
      answer: 'Access the "View Tenants" section in the system from the “Tenants” section in the navigation bar. Click on "Add New Tenant" and fill in the Tenats\'s details, including name, surname, contact information such as phone number and email and the company name and number. Save the tenant information once the form is complete.'
  },
  {
      question: 'How do I generate reports for a specific property and their corresponding details?',
      answer: 'Access the "Generate Property Report" section in the system under “Properties” in the navigation bar, you should find an option for "Generate Property Report". Select this option, and the system will display an option to generate all the current properties reports or a specific property report.'
  },
  {
      question: 'How do I handle deposits for new leases?',
      answer: 'When creating a new lease, you\'ll have the option add and specify the deposit amount. The system will then track and manage deposit transactions according to the lease terms provided.'
  },
  {
      question: 'How to assign maintenance?',
      answer: 'Access the “View Maintenance” section in the system under “Maintenance” in the navigation bar. Click on the “Add Maintenance” button and fill in the details of the maintenance request, including the property, Type of issue, the date and time of the maintenance scheduled then Assign the request to the appropriate contractor.'
  },
  {
      question: 'How to create a new user for the system?',
      answer: 'To create a new user, log in as an administrator with the necessary permissions. Then, navigate to the "Users" section in the navigation bar, and you should find an option to "Create User." Fill in the required user details, such as name, username, email and user role,  thereafter save the user profile.'
  },
  {
      question: 'What details should be provided when logging maintenance?',
      answer: 'When logging a maintenance request, tenants should include: The property Urgency or priority level in the maintenance note Any relevant photos or documentation'
  },
  {
      question: 'What documents can tenant upload?',
      answer: 'Tenants can usually upload documents such as: Company registration documents Identification (e.g., driver\'s license, ID) Proof of Payments Lease agreements Insurance certificates'
  },
  {
      question: 'What is the difference between the recoveries amount and the inspection amount?',
      answer: 'The "recoveries amount" usually refers to costs or expenses incurred by the property owner or management that can be recovered from tenants as part of their lease agreement. The "inspection amount" might pertain to fees related to property inspections, such as move-in or move-out inspections.'
  },
  {
    question: 'How to rent a bike?',
    answer: 'Renting a bike? Well, its just like renting a property. You find a bike, sign a bike lease, and enjoy your two-wheeled adventures! Just kidding, PropNote is here to help with properties, not bikes.'
    
  }
  ];

  displayedColumns: string[] = ['question', 'answer'];
  dataSource = new MatTableDataSource<FaqEntry>(this.faqData);

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

interface FaqEntry {
  question: string;
  answer: string;
}




