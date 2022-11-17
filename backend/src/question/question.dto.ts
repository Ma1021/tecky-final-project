export interface Question_DTO {
    asker_id: number,
    content: string,
    stock_id?:Array<number>
    tag_id?:number
}
