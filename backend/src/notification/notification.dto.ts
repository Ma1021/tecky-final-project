import { IsNumber, IsNotEmpty, IsString } from "class-validator"

export class Notification_DTO {
    @IsNotEmpty()
    @IsNumber()
    notification_type_id: number;
    @IsNotEmpty()
    @IsNumber()
    notification_target_id: number; // question id / answer id etc..
    @IsNotEmpty()
    @IsNumber()
    actor_id: number;
    @IsNotEmpty()
    @IsNumber({}, {each: true})
    notifiers: number[];
}

export class Notification_Delete_DTO {
    @IsNotEmpty()
    @IsNumber()
    target_type_id: number;
    @IsNotEmpty()
    @IsNumber()
    target_id: number;
}

export class Push_Token_DTO {
    @IsNotEmpty()
    @IsString()
    token: string;
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}

export class Push_Notification_DTO {
    @IsNotEmpty()
    @IsNumber()
    notification_type_id: number;
    @IsNotEmpty()
    @IsNumber()
    actor_id: number;
    @IsNotEmpty()
    @IsString()
    actor_username: string;
    @IsNotEmpty()
    notifiers: string[];
    @IsString()
    content?: string;
}