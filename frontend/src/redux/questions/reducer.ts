import { initialState, Question, QuestionState } from "./state";
// import { QuestionActions } from "./actions";

type QuestionActions = any;

export function questionReducer(state: QuestionState = initialState, action:QuestionActions): QuestionState {
    console.log(action);
    if(action.type === "LOAD_QUESTION") {
        return {...state}
    }

    return state;
}

export default questionReducer;
