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
}

export interface QuestionState {
    question: Question;
    questionList: Question[];
    loading: boolean;
    errors: any;
}

export const initialState: QuestionState = {
  question: {} as Question,
  questionList: [],
  loading: false,
  errors: null
}