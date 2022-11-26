import styled from "styled-components";
import UserCard from "./UserCard";
import { useAppSelector } from "../../redux/store";

interface FollowingProps {
    keyword: string
}

const Following: React.FC<FollowingProps> = (props: FollowingProps) => {
    const { followingList } = useAppSelector(
        (state) => state.subscription
    );

    
    return (
        <UserCardContainer>
            {followingList.length > 0 ? props.keyword.trim() !== "" ? followingList.map((following) => {
                if(following.username.toLowerCase().replace(/\s/g, "").includes(props.keyword.toLowerCase())) {
                    return <UserCard key={following.id} page="following" user={following} />
                }}) : followingList.map((following)=>{
                    return <UserCard key={following.id} page="following" user={following} />
                })  : <div>沒有追蹤中用戶</div>}
        </UserCardContainer>
    )
}

export default Following;

const UserCardContainer = styled.div`
    width: 90%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`