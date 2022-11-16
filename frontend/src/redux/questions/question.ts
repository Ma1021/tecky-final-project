import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { QuestionState, Question, initialState } from './state'

// actions that get data 
export const loadQuestions = createAsyncThunk<Question[]>("question/loadQuestion", async(_, thunkAPI)=>{
    try {
        const res = await fetch("http://localhost:8080/question", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        return json
      } catch(err) {
        return thunkAPI.rejectWithValue(err);
      }
})

// actions that post data
export const createQuestion = createAsyncThunk<Object, Question>("question/createQuestion", async(data, thunkAPI)=>{
    try {
        const res:Response = await fetch('http://localhost:8080/question', {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
        thunkAPI.dispatch(loadQuestions());
        const json = await res.json();
        return json;
      } catch(err) {
        return thunkAPI.rejectWithValue(err);
      }
})

// reducers, handle specific state, changes the state
export const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setQuestion: (state, action: PayloadAction<Question[]>) =>{
            state.questionList = action.payload
        }
    },
    extraReducers: (builder) => {
        // the action is pending
        builder.addCase(loadQuestions.pending, (state)=>{
            state.loading = true;
        });
        // the loadQuestion is successfully to called
        builder.addCase(loadQuestions.fulfilled, (state, action)=>{
            state.questionList = action.payload;
            state.loading = false;
        });
        // the loadQuestion is failed to call
        builder.addCase(loadQuestions.rejected, (state, action)=>{
            state.loading = false;
            state.errors = action.payload;
        });
        builder.addCase(createQuestion.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(createQuestion.fulfilled, (state, action)=>{
            state.loading = false;
            state.question = action.payload;
        });
        builder.addCase(createQuestion.rejected, (state, action)=>{
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

export default questionSlice.reducer;
export const { setQuestion } = questionSlice.actions