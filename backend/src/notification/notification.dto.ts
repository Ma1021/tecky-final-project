import { IsNumber, IsNotEmpty } from "class-validator"

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