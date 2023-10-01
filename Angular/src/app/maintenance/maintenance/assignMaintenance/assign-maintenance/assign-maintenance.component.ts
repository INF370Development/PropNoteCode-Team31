
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-assign-maintenance',
  templateUrl: './assign-maintenance.component.html',
  styleUrls: ['./assign-maintenance.component.scss']
})
export class AssignMaintenanceComponent {


@ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // Define your FAQ data here
  faqData: FaqEntry[] = [
    {
      question: 'How to create a new user for the system?',
      answer: 'To create a new user, log in as an administrator with the necessary permissions...',
    },
    {
      question: 'How to add a property?',
      answer: 'Access the "View Properties" section in the system under “Properties” in the navigation bar...',
    },
    // Add more FAQ entries here
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


