import { Component, OnInit } from '@angular/core';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { UserContractor } from 'src/app/shared/UserModels/UserContractor';

@Component({
  selector: 'app-contractor-tree',
  templateUrl: './contractor-tree.component.html',
  styleUrls: ['./contractor-tree.component.scss']
})
export class ContractorTreeComponent implements OnInit{
  groupedContractors: Map<string, Contractor[]> = new Map<string, Contractor[]>();
  groupedLocations: Map<string, Contractor[]> = new Map<string, Contractor[]>();
  groupedAvailability: Map<string, Contractor[]> = new Map<string, Contractor[]>();

  constructor(private contractorService: ContractorService) {}

  ngOnInit(): void {
    this.contractorService
      .getContractorsGroupedBySpecialty()
      .subscribe((groupedContractors) => {
        this.groupedContractors = groupedContractors;
      });

    this.contractorService
    .getContractorsGroupedByLocation()
    .subscribe((groupedLocations) => {
      this.groupedLocations = groupedLocations;
    });

    this.contractorService
      .getContractorsGroupedByAvailability()
      .subscribe((groupedAvailability) => {
        this.groupedAvailability = groupedAvailability;
      });
  }
}

