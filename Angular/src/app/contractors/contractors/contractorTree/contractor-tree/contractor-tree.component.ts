import { Component, OnInit } from '@angular/core';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/UserModels/Contractor';

@Component({
  selector: 'app-contractor-tree',
  templateUrl: './contractor-tree.component.html',
  styleUrls: ['./contractor-tree.component.scss']
})
export class ContractorTreeComponent implements OnInit{
  groupedContractors: Map<string, Contractor[]> = new Map<string, Contractor[]>();


  constructor(private contractorService: ContractorService) {}

  ngOnInit(): void {
    this.contractorService
      .getContractorsGroupedBySpecialty()
      .subscribe((groupedContractors) => {
        this.groupedContractors = groupedContractors;
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

