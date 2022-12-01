import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Question, initialState } from './state'

const userStorage = localStorage.getItem("auth_stockoverflow") as string;
let userData: any

if(userStorage) {
    const { user } = JSON.parse(userStorage)
    if(user) {
        userData = user
    }
}

// actions that get data
export const loadQuestions = createAsyncThunk<Question[]>("question/loadQuestions", async(_, thunkAPI)=>{
    try {        
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question`, {
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
        const res:Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question/user/${id}`, {
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        const json = await res.json();
        return json;
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

// actions that get answerer question by user id
export const loadAnswererQuestions = createAsyncThunk<Question[], number>("question/loadAnswererQuestions", async(id, thunkAPI)=>{
    try {
        const res:Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question/answerer/${id}`, {
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
        const res: Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json();        
        return json[0];
      } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})

// actions that post data
export const createQuestion = createAsyncThunk<Question, Object>("question/createQuestion", async(data, thunkAPI)=>{
    try {
        const res:Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question`, {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data)
        })
        const json = await res.json();     

        // insert notification 
        const followerRes = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/followers/${userData.id}`)
        const followerJson = await followerRes.json();
        const notifier_token = []
        
        if(followerJson.length > 0) {
            for(let follower of followerJson) {
                const notification = {
                    notification_type_id:1,
                    notification_target_id: json[0].id,
                    actor_id: userData.id,
                    notifiers: follower.user_id,
                }
                
                await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/`, {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(notification)
                })

                if(follower.push_notification_token) {
                    notifier_token.push(follower.push_notification_token);
                }
            }
            
            // push notification
            if(notifier_token.length > 0) {
                await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/push_notification`, {
                    method:"POST",
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        notification_type_id:1,
                        actor_id: userData.id,
                        actor_username: userData.username,
                        notifiers: notifier_token,
                        content: json[0].content
                    })
                })
            }
        }

        thunkAPI.dispatch(loadQuestions());

        return json[0];
      } catch(err) {
        return thunkAPI.rejectWithValue(err);
      }
})

// action that delete question by id
export const deleteQuestion = createAsyncThunk<Question, {question_id: number, user_id: number}>("question/deleteQuestion", async(data, thunkAPI)=>{
    try {
        const res: Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/question/${data.question_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json();


        // delete notification
        fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({target_id: data.question_id, target_type_id: 1})
        })

        return json;
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

// action that create answer in question
export const createAnswer = createAsyncThunk<Question, {answerer_id: number, asker_id: number, question_id: number, content: string}>(
    "question/createAnswer",
    async(data, thunkAPI) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/answer/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            })
            const json = await res.json();
            
            // create notification
            if(data.asker_id !== data.answerer_id) {
                const notification = {
                    notification_type_id: 2,
                    notification_target_id: json.answer_id,
                    actor_id: userData.id,
                    notifiers: data.asker_id
                }
    
                fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/`, {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(notification)
                })
    
                // push notification
                fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/push_notification`, {
                    method:"POST",
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        notification_type_id:2,
                        actor_id: userData.id,
                        actor_username: userData.username,
                        notifiers: [data.asker_id],
                        content: data.content
                    })
                })
            }

            thunkAPI.dispatch(loadQuestion(data.question_id));
            thunkAPI.dispatch(loadQuestions());

            return json;
        } catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

// action that delete answer in question
export const deleteAnswer = createAsyncThunk<Question, {question_id: number, answer_id: number}>("question/deleteAnswer", async(data, thunkAPI)=>{
    try {
        // delete likes
        fetch(`${process.env.REACT_APP_PUBLIC_URL}/answer/like`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({answer_id:+data.answer_id, user_id:userData.id})
        })

        const res: Response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/answer/${data.answer_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
        const json = await res.json();

        thunkAPI.dispatch(loadQuestion(data.question_id));
        thunkAPI.dispatch(loadQuestions());

        // delete notification
        fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({target_id: +data.answer_id, target_type_id: 2})
        })        

        return json[0];
      } catch (err) {
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

        builder.addCase(loadAnswererQuestions.pending, (state, action)=>{
            state.loading = true;
        })
        builder.addCase(loadAnswererQuestions.fulfilled, (state, action)=>{
            state.answererQuestionList = action.payload;
            state.loading = false;
        })
        builder.addCase(loadAnswererQuestions.rejected, (state, action)=>{
            state.errors = action.payload;
            state.loading = false;
        })

        builder.addCase(createQuestion.pending, (state)=>{
            state.loading = true;
        });      
        builder.addCase(createQuestion.fulfilled, (state, action)=>{
            if(state.questionList.length > 1) {
                state.questionList.unshift(action.payload);
                state.askerQuestionList.unshift(action.payload);
            } else {
                state.questionList.push(action.payload);
                state.askerQuestionList.push(action.payload);
            }
            state.loading = false;
        });
    }
});

const reducer = questionSlice.reducer;
export default reducer;

export const { setQuestion } = questionSlice.actions