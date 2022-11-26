import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonContent,
    IonText,
    IonImg,
    IonButton,
    IonIcon
} from "@ionic/react";
import Title from "../../components/All/Title";
import styled from "styled-components";
import { people } from "ionicons/icons";
import UserCard from "./UserCard";
import {useEffect, useState} from 'react';

interface FollowerCountList {
    id: number
    username: string,
    introduction: string
    followers: string
}

const Live: React.FC = () => {
    const [followerCountList, setFollowerCountList ] =  useState(Array<FollowerCountList>);
    const topThree = followerCountList.slice(0, 3);

    async function fetchFollowerCount() {
        const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/follower/count`)
        if(res.ok) {
            const json = await res.json();
            setFollowerCountList(json);
        }
    }
    
    useEffect(()=>{
        fetchFollowerCount();
    },[])
    
    return (
        <IonPage id="main-content">
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
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
                            <div className="2nd">
                                <IonImg className="icon" src="https://scontent.fhkg10-1.fna.fbcdn.net/v/t39.30808-6/293487775_591967448961252_2293454378797054705_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TVGCEZ_jPcYAX9o3nmb&_nc_ht=scontent.fhkg10-1.fna&oh=00_AfBPevGG1PKXmvTGDpSqdh5gBqj42G4RS2UXPb-RMs9nVg&oe=6381D9B8" />
                                <div className="rankMark">
                                    <IonImg src={require("./2nd.png")} />
                                    <IonText>古天后</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>5128</IonText>
                                </div>
                                <IonButton>追蹤</IonButton>
                            </div>
                            <div className="1st">
                                <IonImg className="icon" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/260252262_3121808114767525_3237799065672652954_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0yJQyK_QPqcAX-M0XVp&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCND-3quiMRdQ1LYFIeeJLF3Au_CNjefgda4jkmnsryBg&oe=637F5363" />
                                <div className="rankMark">
                                    <IonImg src={require("./1st.png")} />
                                    <IonText>{topThree[0].username}</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>{topThree[0].followers}</IonText>
                                </div>
                                <IonButton>追蹤</IonButton>
                            </div>
                            <div className="3rd">
                                <IonImg className="icon" src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/260252262_3121808114767525_3237799065672652954_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0yJQyK_QPqcAX-M0XVp&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCND-3quiMRdQ1LYFIeeJLF3Au_CNjefgda4jkmnsryBg&oe=637F5363" />
                                <div className="rankMark">
                                    <IonImg src={require("./3rd.png")} />
                                    <IonText>豹姐</IonText>
                                </div>
                                <div className="liveAmount">
                                    <IonIcon icon={people} />
                                    <IonText>1145</IonText>
                                </div>
                                <IonButton>追蹤</IonButton>
                            </div>
                        </div>
                        }
                    </RecommendContainer>

                    <KOLRanking>
                        <IonText>KOL排行</IonText>
                        <UserCard/>
                        <UserCard/>
                        <UserCard/>
                        <UserCard/>
                    </KOLRanking>
                </Container>
                <Background/>
            </IonContent>
        </IonPage>
    )
}

export default Live;

const KOLRanking = styled.div`
    min-height: 45%;
    padding: 0rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`

const RecommendContainer = styled.div`
    height: 22%;
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
    top:10px;
    z-index: -1;
`

const Container = styled.div`
    background-color: #111;
    width: 100%;
    height: 90%;
    position: absolute;
    top: 80px;
    border-radius: 1.5rem 1.5rem 0rem 0rem;

    .title {
        position: absolute;
        top: -3.8rem;
        left: 1rem;
        font-weight: 800;
        font-size: 17px;
    }
`