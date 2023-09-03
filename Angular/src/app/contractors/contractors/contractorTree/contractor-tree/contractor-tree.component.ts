import { Component, AfterViewInit, OnInit } from '@angular/core';
/*import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';*/

@Component({
  selector: 'app-contractor-tree',
  templateUrl: './contractor-tree.component.html',
  styleUrls: ['./contractor-tree.component.scss']
})
export class ContractorTreeComponent {  //AfterViewInit, OnInit{

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

}
