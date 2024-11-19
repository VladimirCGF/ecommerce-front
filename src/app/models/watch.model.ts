import {Storage} from "./storage.model";

export class Watch {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  material!: string;
  color!: string;
  gender!: string;
  brand!: string;
  format!: string;
  mechanism!: string;
  imagePerfil!: Storage;
  imageUrls!: Storage[];
}
