import {
    IonText,
    IonImg,
    IonButton,
    IonIcon
} from "@ionic/react";
import { people } from "ionicons/icons";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { followUser, unFollowUser } from '../../redux/subscription/subscriptionSlice';

interface RankingProps {
    kol: {
        username: string
        id: number
        avatar: string
        followers: string
        introduction: string
    }
    cardId: number
}

const UserCard: React.FC<RankingProps> = (props:RankingProps) => {
    const { followingIdList } = useAppSelector(
        (state) => state.subscription
    );

    const dispatch = useAppDispatch();

    const { user } = JSON.parse(localStorage.getItem("auth_stockoverflow") as string)
    const user_id = +user.id;

    async function handleFollowUser(e: any) {
        e.preventDefault();
        await dispatch(followUser({following_id:+e.target.parentNode.dataset.user_id, user_id}));
    }

    async function handleUnFollowUser(e: any) {
        e.preventDefault();
        await dispatch(unFollowUser({following_id:+e.target.parentNode.dataset.user_id, user_id}));
    }

    return (
        <Card data-user_id={props.kol.id}>
            <IonText>{props.cardId}</IonText>
            <div className="cardContent">
                <IonImg src={props.kol.avatar}/>
                <div className="userInfo">
                    <div className="amountInfo">
                        <IonText>{props.kol.username}</IonText>
                        <div className="amount">
                            <IonIcon icon={people} />
                            <IonText>{props.kol.followers}</IonText>
                        </div>
                    </div>
                    <IonText>{props.kol.introduction}</IonText>
                </div>
            </div>
            {followingIdList.includes(props.kol.id) ? <IonButton onClick={handleUnFollowUser}>取消關注</IonButton> : <IonButton onClick={handleFollowUser}>關注</IonButton>}
        </Card>
    )
}

export default UserCard;

const Card = styled.div`
    height: 5rem;
    border-radius: 0.5rem;
    background-color: #333;
    display: flex;
    align-items: center;
    padding: 0rem 1.3rem;
    position: relative;

    ion-img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
    }

    .cardContent {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: 1rem;

        .userInfo {
            display: flex;
            flex-direction: column;

            ion-text:nth-child(2) {
                font-size: 13px;
                color: #9e9e9e;
            }
        }

        .amountInfo {
            display: flex;
            gap: 0.5rem;

            .amount {
                display: flex;
                align-items: center;
                font-size: 14px;
                gap:0.3rem;
            }
        }
    }

    ion-button {
        width: 4.5rem;
        height: 2rem;
        font-size: 14px;
        position: absolute;
        right: 5%;
    }
    
`