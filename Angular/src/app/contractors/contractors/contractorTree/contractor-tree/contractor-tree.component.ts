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


  
  //AfterViewInit, OnInit{

  /*reeControl = new NestedTreeControl<ContractorNode>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<ContractorNode>();

  ngOnInit(): void {
    this._contractorService.getContractors().subscribe((contractors: any) => {
      // Transform your flat contractor data into a hierarchical structure.
      const contractorNodes: ContractorNode[] = contractors.map(contractor => ({
        data: contractor,
        children: [], // You may populate this if your data has a hierarchy
      }));
      this.treeDataSource.data = contractorNodes;
    });
  }

  // Other methods...

  hasChild = (_: number, node: ContractorNode) => !!node.children && node.children.length > 0;
}

interface ContractorNode {
  data: Contractor;
  children: ContractorNode[];*/

