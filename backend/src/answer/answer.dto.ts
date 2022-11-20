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