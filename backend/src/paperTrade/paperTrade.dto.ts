import { IsNotEmpty } from 'class-validator';

export class PlaceOrderDTO {
  @IsNotEmpty()
  userID: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  orderType: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  account: string;
}

export class CloseOrderDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  userID: number;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  isLong: boolean;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  account: string;
}
