import { Question } from "./state";
import { LOAD_QUESTION, CREATE_QUESTION, REMOVE_QUESTION } from "./types";

export const loadQuestions = () => async (dispatch: any) => {
  try {
    const res = await fetch("http://localhost:8080/question", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json:Question[] = await res.json();

    return {
      type: LOAD_QUESTION,
      payload: json
    }
  } catch(err) {
    console.log(err);
  }
}

export const createQuestion = (obj:{stock_id?:number, content:string, asker_id: number}) => async(dispatch: any) => {
  try {
    const res = await fetch('http://localhost:8080/question', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify(obj)
    })

    return{
      type: CREATE_QUESTION,
      payload: await res.json()
    }
  } catch(err) {
    console.log(err);
  }
}

export const removeQuestion = (question_id: number)=> async (dispatch:any) => {
  try {
    await fetch(`http://localhost:8080/question/${question_id}`);

    return{
      type:REMOVE_QUESTION,
      payload:{question_id},
    };
  } catch(err) {
    console.log(err);
  }
}

export type QuestionActions =
 ReturnType<typeof loadQuestions> |
 ReturnType<typeof createQuestion> |
 ReturnType<typeof removeQuestion>;
