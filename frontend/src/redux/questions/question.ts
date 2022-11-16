import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Question, initialState } from './state'

// actions that get data 
export const loadQuestions = createAsyncThunk<Question[]>("question/loadQuestions", async(_, thunkAPI)=>{
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

// action that get asker question by user id
export const loadAskerQuestions = createAsyncThunk<Question[], number>("question/loadAskerQuestions", async(id, thunkAPI)=>{
    try {
        const res:Response = await fetch(`http://localhost:8080/question/user/${id}`, {
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        const json = await res.json();
        return json;
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

// actions that get one question
export const loadQuestion = createAsyncThunk<Question, number>("question/loadQuestion", async(id, thunkAPI)=>{
    try {
        const res = await fetch(`http://localhost:8080/question/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        // thunkAPI.dispatch(loadQuestions());
        const json = await res.json();
        return json[0];
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
      }
})

// actions that post data
export const createQuestion = createAsyncThunk<Question, Object>("question/createQuestion", async(data, thunkAPI)=>{
    try {
        const res:Response = await fetch('http://localhost:8080/question', {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
        const json = await res.json();
        return json[0];
      } catch(err) {
        return thunkAPI.rejectWithValue(err);
      }
})

// action that delete question by id
export const deleteQuestion = createAsyncThunk<Question, {question_id: number, user_id: number}>("question/deleteQuestion", async(data, thunkAPI)=>{
    try {
        const res = await fetch(`http://localhost:8080/question/${data.question_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json();
        thunkAPI.dispatch(loadQuestions());
        thunkAPI.dispatch(loadAskerQuestions(data.user_id));
        return json;
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

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
            state.errors = action.payload;
            state.loading = false;
        });

        builder.addCase(loadQuestion.pending, (state)=>{
            state.loading = true
        });
        builder.addCase(loadQuestion.fulfilled, (state, action)=>{
            state.question = action.payload;
            state.loading = false;
        });
        builder.addCase(loadQuestion.rejected, (state, action)=>{
            state.errors = action.payload;
            state.loading = false;
        });

        builder.addCase(loadAskerQuestions.pending, (state, action)=>{
            state.loading = true;
        })

        builder.addCase(loadAskerQuestions.fulfilled, (state, action)=>{
            state.askerQuestionList = action.payload;
            state.loading = false;
        })

        builder.addCase(loadAskerQuestions.rejected, (state, action)=>{
            state.errors = action.payload;
            state.loading = false;
        })
        builder.addCase(createQuestion.pending, (state)=>{
            state.loading = true;
        });      
        builder.addCase(createQuestion.fulfilled, (state, action)=>{
            state.questionList.push(action.payload);
            state.askerQuestionList.push(action.payload);
            state.loading = false;
        });
    }
});

const reducer = questionSlice.reducer;
export default reducer;

export const { setQuestion } = questionSlice.actions