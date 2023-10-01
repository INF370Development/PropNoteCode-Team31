import { Property } from "./Property";

export class PropertyImage {
  propertyImageID: number = 0; // Primary key
  imageName: string = "";
  imageData: string = ""; // Represents byte array, you can change it based on your requirement
  propertyID: number = 0;
}
