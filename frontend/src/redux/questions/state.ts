export interface Question {
    id: number;
    content: string;
    created_at: string;
    asker_id: number;
    asker_username: string;
    asker_avatar: string;
    stock: Array<{
      id: number;
      name: string;
      symbol: string;
      created_at: string;
      updated_at: string;
    }>;
    tag_id: number;
    answer:Array<{
      id: number
      answers:{
        id:number,
        avatar: string,
        username: string
      },
      content: string,
      created_at: string,
      likes_user_id: Array<Number>
    }>
}

export interface QuestionState {
    question: Question;
    questionList: Question[];
    askerQuestionList: Question[];
    loading: boolean;
    errors: any;
}

export const initialState: QuestionState = {
  question: {} as Question,
  questionList: [],
  askerQuestionList: [],
  loading: false,
  errors: null
}