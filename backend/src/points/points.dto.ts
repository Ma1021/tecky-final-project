import { IsNumber, IsNotEmpty, IsString } from "class-validator"

export class Points_DTO {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    @IsNotEmpty()
    @IsString()
    event: string;
    @IsNotEmpty()
    @IsNumber()
    event_id: number;
    point: number;
}


