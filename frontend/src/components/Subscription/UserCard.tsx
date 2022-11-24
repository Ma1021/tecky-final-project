import { IonButton, IonImg, IonText } from "@ionic/react";
import styled from "styled-components";
import { User } from "../../pages/user/Subscription";
import { followUser, unFollowUser } from '../../redux/subscription/subscriptionSlice';
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";

interface SubscriptionProps {
    page: string
    user: User
}

const UserCard: React.FC<SubscriptionProps> = (props: SubscriptionProps) => { 
    const dispatch = useAppDispatch();
    const { followingIdList } = useAppSelector(
        (state: RootState) => state.subscription
    );
    
    async function handleFollowUser(e: any) {
        e.preventDefault();
        console.log(e.target.innerText);
        await dispatch(followUser(+e.target.parentNode.dataset.user_id));
    }

    async function handleUnFollowUser(e: any) {
        e.preventDefault();
        console.log(e.target.innerText);
        await dispatch(unFollowUser(+e.target.parentNode.dataset.user_id));
    }
    
    return (
        <Card data-user_id={props.user.user_id}>
            <div className="userContent">
                <IonImg src={props.user.avatar}/>
                <div className="userInfo">
                    <IonText>{props.user.username}</IonText>
                    <IonText>{props.user.introduction}</IonText>
                </div>
            </div>
            {props.page === 'follower' && !followingIdList.includes(props.user.user_id) ? <IonButton onClick={handleFollowUser}>追蹤</IonButton> : <IonButton onClick={handleUnFollowUser} >取消追蹤</IonButton>}
        </Card>
    )
}

export default UserCard;

const Card = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .userContent {
        display: flex;
        align-items: center;
        gap: 1rem;

        ion-img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
            object-fit: cover;
        }
        
        .userInfo {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            ion-text:nth-child(2) {
                font-size: 13px;
                color: #9e9e9e;
                width: 180px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }

    ion-button {
        width: 5rem;
        height: 2.2rem;
        font-size: 14px;
    }
    

`