import {
    IonText,
    IonImg,
    IonButton,
    IonIcon
} from "@ionic/react";
import { people } from "ionicons/icons";
import styled from "styled-components";

const UserCard: React.FC = () => {
    return (
        <Card>
            <IonText>4</IonText>
            <div className="cardContent">
                <IonImg src="https://scontent.fhkg10-1.fna.fbcdn.net/v/t39.30808-6/293487775_591967448961252_2293454378797054705_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TVGCEZ_jPcYAX9o3nmb&_nc_ht=scontent.fhkg10-1.fna&oh=00_AfBPevGG1PKXmvTGDpSqdh5gBqj42G4RS2UXPb-RMs9nVg&oe=6381D9B8"/>
                <div className="userInfo">
                    <div className="amountInfo">
                        <IonText>古天后</IonText>
                        <div className="amount">
                            <IonIcon icon={people} />
                            <IonText>183</IonText>
                        </div>
                    </div>
                    <IonText>金融獵豹，人稱豹姐</IonText>
                </div>
            </div>
            <IonButton>追蹤</IonButton>
        </Card>
    )
}

export default UserCard;

const Card = styled.div`
    height: 5rem;
    border-radius: 0.5rem;
    background-color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1.3rem;

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
    }
    
`