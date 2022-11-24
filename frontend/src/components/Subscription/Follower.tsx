import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import UserCard from "./UserCard";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";

interface FollowerProps {
    keyword: string
}

const Follower: React.FC<FollowerProps> = (props: FollowerProps) => {
    const { followerList } = useAppSelector(
        (state: RootState) => state.subscription
    );
    
    return (
        <UserCardContainer>
            {followerList.length > 0 ? props.keyword.trim() !== "" ? followerList.map((follower) => {
                if(follower.username.toLowerCase().replace(/\s/g, "").includes(props.keyword.toLowerCase())) {
                    return <UserCard key={follower.id} page="follower" user={follower}/>
                }}) :  followerList.map((follower)=>{
                    return <UserCard key={follower.id} page="follower" user={follower}/>
                }) : <div>沒有追蹤者</div>}
        </UserCardContainer>
    )
}

export default Follower;

const UserCardContainer = styled.div`
    width: 90%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
` 