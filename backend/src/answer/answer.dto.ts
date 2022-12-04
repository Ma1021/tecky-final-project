import { IsNumber, IsNotEmpty, IsString } from "class-validator"

export class Answer_DTO {
    @IsNotEmpty()
    @IsNumber()
    answerer_id: number;
    @IsNotEmpty()
    @IsNumber()
    question_id: number;
    @IsNotEmpty()
    @IsString()
    content: string;
}

export class Answer_Like_DTO {
    @IsNotEmpty()
    @IsNumber()
    answer_id: number;
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
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