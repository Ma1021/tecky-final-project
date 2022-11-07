import { legacy_createStore as createStore } from "redux"; 
import { RootState } from "./state";

function reducer():RootState {
    return {
        questionList:[
            {
                "id":1,
                "asker_id":1,
                "asker_username": "heiman",
                "asker_avatar":"https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
                "asker_content": "想問依家可撈底?",
                "tags":[
                    {
                        "tag_id":1,
                        "tag_name":"#VOO"
                    },
                    {
                        "tag_id":2,
                        "tag_name":"#QQQ"
                    }
                ],
                "answerer_id":2,
                "answerer_username": "man",
                "answerer_avatar": "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
                "answerer_content":"仲有得跌",
                "created_time":"2022-11-6"
            },
            {
                "id":2,
                "asker_id":2,
                "asker_username": "man",
                "asker_avatar":"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
                "asker_content": "想問依家可對沖?",
                "tags":[
                    {
                        "tag_id":2,
                        "tag_name":"#QQQ"
                    },
                    {
                        "tag_id":22,
                        "tag_name":"#VOO"
                    }
                ],
                "answerer_id":1,
                "answerer_username": "heiman",
                "answerer_avatar": "https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg",
                "answerer_content":"仲有得跌",
                "created_time":"2022-11-6"
            },
            {
                "id":3,
                "asker_id":2,
                "asker_username": "man",
                "asker_avatar":"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
                "asker_content": "美股到底未?",
                "tags":[
                    {
                        "tag_id":22,
                        "tag_name":"#VOO"
                    }
                ],
                "answerer_id":3,
                "answerer_username": "rabbit",
                "answerer_avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Oryctolagus_cuniculus_Tasmania_2.jpg/1200px-Oryctolagus_cuniculus_Tasmania_2.jpg",
                "answerer_content":"仲有得跌",
                "created_time":"2022-11-6"
            }
        ]
    }
}

export let store = createStore(reducer)

