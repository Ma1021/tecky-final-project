import { IsNotEmpty } from 'class-validator';

export class PlaceOrderDTO {
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  stockID: string;

  @IsNotEmpty()
  orderType: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  quantity: string;
}
