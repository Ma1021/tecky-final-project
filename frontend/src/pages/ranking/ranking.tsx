import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonContent,
    IonText,
    IonImg,
    IonButton,
    IonIcon,
    useIonRouter
} from "@ionic/react";
import Title from "../../components/All/Title";
import styled from "styled-components";
import { people } from "ionicons/icons";
import UserCard from "./UserCard";
import {useCallback, useEffect, useState} from 'react';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { loadFollowingsId, followUser, unFollowUser } from '../../redux/subscription/subscriptionSlice';

interface FollowerCountList {
    id: number
    username: string,
    introduction: string
    followers: string
    avatar: string
}

const Ranking: React.FC = () => {
    const [followerCountList, setFollowerCountList ] =  useState(Array<FollowerCountList>);
    const topThree = followerCountList.slice(0, 3);
    const otherRanking = followerCountList.slice(3);
    const { followingIdList } = useAppSelector(
        (state) => state.subscription
    );
    
    const router = useIonRouter();

    let user_id: number = 0
  
    if(localStorage.getItem("auth_stockoverflow") !== null) {
      const user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
      user_id = +user.id;
    }

    const dispatch = useAppDispatch();

    const initIdList = useCallback(async () => {
        await dispatch(loadFollowingsId(user_id));
    }, [dispatch]);

    useEffect(()=>{
        initIdList();
    },[])

    async function fetchFollowerCount() {
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/follower/count`)
        if(res.ok) {
            const json = await res.json();
            setFollowerCountList(json);
        }
    }

    useEffect(()=>{
        fetchFollowerCount();
    },[followingIdList])

    async function handleFollowUser(e: any) {
        const following_id = +e.target.parentNode.dataset.user_id
        e.preventDefault();
        await dispatch(followUser({following_id, user_id}));
    }

    async function handleUnFollowUser(e: any) {
        const following_id = +e.target.parentNode.dataset.user_id
        e.preventDefault();
        await dispatch(unFollowUser({following_id, user_id}));
    }
    
    return (
        <IonPage id="main-content">
            <IonHeader translucent={true} collapse="fade" className="d-flex align-items-center">
                <IonToolbar >
                    <Title title="排行榜" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Background/>
                <Container>
                    <IonText class="title">人氣KOL</IonText>
                    <RecommendContainer>
                        {topThree.length > 0 &&
                        <div className="ranking">
                            <div className="2nd" data-user_id={topThree[1].id}>
                                <IonImg className="icon" src={topThree[1].avatar} />
                                <div className="rankMark">
                                    <IonImg src={require("./2nd.png")} />
                                    <IonText>{topThree[1].username}</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>{topThree[1].followers}</IonText>
                                </div>
                                {topThree[1].id === user_id ? <IonButton onClick={()=>router.push('/user/info', 'forward', 'push')}>個人專頁</IonButton> 
                                : followingIdList.includes(topThree[1].id) ? <IonButton onClick={handleUnFollowUser}>取消關注</IonButton> 
                                :  <IonButton onClick={handleFollowUser}>關注</IonButton>}
                            </div>
                            <div className="1st" data-user_id={topThree[0].id}>
                                <IonImg className="icon" src={topThree[0].avatar} />
                                <div className="rankMark">
                                    <IonImg src={require("./1st.png")} />
                                    <IonText>{topThree[0].username}</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>{topThree[0].followers}</IonText>
                                </div>
                                {topThree[0].id === user_id ? <IonButton onClick={()=>router.push('/user/info', 'forward', 'push')}>個人專頁</IonButton> 
                                : followingIdList.includes(topThree[0].id) ? <IonButton onClick={handleUnFollowUser}>取消關注</IonButton> 
                                :  <IonButton onClick={handleFollowUser}>關注</IonButton>}
                            </div>
                            <div className="3rd" data-user_id={topThree[2].id}>
                                <IonImg className="icon" src={topThree[2].avatar} />
                                <div className="rankMark">
                                    <IonImg src={require("./3rd.png")} />
                                    <IonText>{topThree[2].username}</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>{topThree[2].followers}</IonText>
                                </div>
                                {topThree[2].id === user_id ? <IonButton onClick={()=>router.push('/user/info', 'forward', 'push')}>個人專頁</IonButton> 
                                : followingIdList.includes(topThree[2].id) ? <IonButton onClick={handleUnFollowUser}>取消關注</IonButton> 
                                :  <IonButton onClick={handleFollowUser}>關注</IonButton>}
                            </div>
                        </div>
                        }
                    </RecommendContainer>

                    <KOLRanking>
                        <IonText>KOL排行</IonText>
                        {otherRanking.length > 0 && otherRanking.map((kol, index) => {
                            return <UserCard kol={kol} key={index+4} cardId={index+4}/>
                        } 
                        )}
                    </KOLRanking>
                </Container>
            </IonContent>
        </IonPage>
    )
}

export default Ranking;

export const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KOLRanking = styled.div`
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
`

const RecommendContainer = styled.div`
    padding: 1rem;

    ion-text {
        font-weight: 600;
    }

    .ranking {
        width: 100%;
        border-radius: 10px;
        margin-top: -3.3rem;
        display: flex;
        align-items: center;
        color: #dedede;

        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            
            ion-button {
                width: 5rem;
                height: 1.8rem;
                line-height: 1.8rem;
                font-size: 14px;

                ion-icon {
                    width: 1.2rem;
                    height: 1rem;
                    background-color: #fff;
                    border-radius: 50%;
                    color: #ffaf4d;
                    margin-right: 0.3rem;
                    padding: 0.2rem;
                }
            }
            
            .liveAmount {
                height: 20px;
                line-height: 20px;
                display: flex;
                flex-direction: row;
                align-item: center;
                justify-content: center;

                ion-icon {
                    font-size: 14px;
                }
            }

            .rankMark {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                ion-img {
                    width: 1rem;
                    height: 1.5rem;
                }
            }
        }

        div:nth-child(even) {
            .icon {
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                overflow: hidden;
                object-fit: cover;
            }
        }

        div:nth-child(odd) {
            font-size: 14px;
            .icon {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
                overflow: hidden;
                object-fit: cover;
            }
        }
    }
`

const Background = styled.div`
    width: 100%;
    height: 15%;
    background-image: linear-gradient(to right bottom, #ffc748, #ffba53, #ffae5e, #ffa46a, #ff9b75);
    position: absolute;
    top:0px;
    z-index: -1;
`

const Container = styled.div`
    background-color: #111;
    width: 100%;
    position: absolute;
    top: 65px;
    border-radius: 1.5rem 1.5rem 0rem 0rem;

    .title {
        position: absolute;
        top: -3.6rem;
        left: 1rem;
        font-weight: 600;
        font-size: 17px;
    }
`