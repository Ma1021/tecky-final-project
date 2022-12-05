import { IsNumber, IsNotEmpty, IsString, IsBoolean } from "class-validator"

export class Question_DTO {
    @IsNotEmpty()
    @IsNumber()
    asker_id: number;
    @IsNotEmpty()
    @IsString()
    content: string;
    stock_id?:Array<number>
    tag_id?:number
}


export class Report_DTO {
    @IsNotEmpty()
    @IsNumber()
    from_user_id: number;
    @IsNotEmpty()
    @IsNumber()
    to_user_id: number; 
    @IsNotEmpty()
    @IsString()
    reason: string;
    @IsNotEmpty()
    @IsString()
    target_type: string;
    @IsNotEmpty()
    @IsNumber()
    target_id: number;
}
