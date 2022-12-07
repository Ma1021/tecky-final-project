import { IsNotEmpty } from 'class-validator';

export class PlaceOrderDTO {
  @IsNotEmpty()
  userID: number;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  orderDirection: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

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
