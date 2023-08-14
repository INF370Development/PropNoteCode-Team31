import { BrokerComponent } from "src/app/broker/broker/broker.component";
import { Broker } from "../Broker";

export class Property {
  propertyID: Number = 0;
  description: string = "";
  buildingNumber: number = 0;;
  street: string = "";
  suburb: string = "";
  purchaseAmount: number = 0;
  purchaseYear: string = "";
  size: string = "";
  yard: string = "";
  brokerID: Number = 0;
  broker: Broker = new Broker();

  constructor(){
  }
}
