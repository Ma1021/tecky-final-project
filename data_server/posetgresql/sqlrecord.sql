create table if not exists users (
                        id int primary key,
                        username text,
                        birthday date,
                        gender text ,
                        created_at timestamptz);

create table if not exists chatrooms (
                        id int primary key,
                        name text,
                        host int,
                        created_at timestamptz,
                        FOREIGN KEY (host) REFERENCES users(id)
                        );

create table if not exists chatroom_record (
                        id int primary key,
                        chatroom int,
                        "user" int,
                        record text,
                        created_at timestamptz,
                        FOREIGN KEY (chatroom) REFERENCES chatrooms(id),
                        FOREIGN KEY ("user") REFERENCES users(id)
                        );

create table if not exists chatroom_user (
                        id int primary key,
                        member int,
                        chatroom int,
                        created_at timestamptz,
                        FOREIGN KEY (chatroom) REFERENCES chatrooms(id),
                        FOREIGN KEY (member) REFERENCES users(id)
                        );

create table if not exists questions (
                        id int primary key,
                        asker_id int,
                        content text,
                        tag_id int,
                        created_at timestamptz,
                        FOREIGN KEY (asker_id) REFERENCES users(id)
                        );

create table if not exists answers (
                        id int primary key,
                        question_id int,
                        answerer_id int,
                        content text,
                        created_at timestamptz,
                        FOREIGN KEY (question_id) REFERENCES questions(id),
                        FOREIGN KEY (answerer_id) REFERENCES users(id)
                        );

create table if not exists ans_likes (
                        id int primary key,
                        user_id int,
                        answer_id int,
                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (answer_id) REFERENCES answers(id)
                        );

