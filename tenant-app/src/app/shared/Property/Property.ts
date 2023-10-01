import { BrokerComponent } from "src/app/broker/broker/broker.component";
import { Broker } from "../Broker";
import { Recovery } from "./Recovery";
import { Inspection } from "./Inspection";
import { PropertyImage } from "./PropertyImage";

export class Property {
  propertyID: number = 0;
  description: string = "";
  buildingNumber: number = 0;;
  street: string = "";
  suburb: string = "";
  purchaseAmount: number = 0;
  purchaseYear: number = 2023;
  size: number = 0;
  yard: number = 0;
  brokerID: number = 0;
  broker: Broker = new Broker();
  recoveries: Recovery[] = [];
  inspections: Inspection[] = [];
  propertyImage : PropertyImage[] = [];
  constructor(){
  }
}
