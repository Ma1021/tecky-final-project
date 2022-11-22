import { IsNotEmpty, IsNumber } from "class-validator";

export class SubscriptionDTO {
    @IsNotEmpty()
    @IsNumber()
    following_id: number;
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}