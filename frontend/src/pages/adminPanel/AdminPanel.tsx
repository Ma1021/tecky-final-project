import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonText, IonCheckbox, IonIcon, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ConfirmedReportList from "../../components/AdminPanel/ConfirmedReportList";
import WaitingReportList from "../../components/AdminPanel/WaitingReportList";

export interface Report {
   id: number,
   from_user_id: number,
   to_user_id: number,
   reason: string,
   target_type: string,
   target_id: number,
   is_confirmed: false,
   created_at: string,
   updated_at: string,
   to_user_username: string,
   to_user_avatar: string,
   to_user_type: string
   content: string
}

const AdminPanel: React.FC = () => {
   const [reports, setReports] = useState({
      waitingReports:[] as Array<Report>,
      confirmedReports:[] as Array<Report>
   });
   const [ isChecked, setChecked ] = useState([] as Array<number>);
   const [ reports_ids, setReportId ] = useState([] as Array<number>);
   const [ showSelected, setShowSelected] = useState(-1);

   useEffect(()=>{
      fetchData(); 
   },[]);

   function fetchData() {
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/report`)
      .then(response => response.json())
      .then((json) => {
         setReports(json);
         const ids = [] as Array<number>;
         for(let report of json.waitingReports) {
            ids.push(report.id)
         }
         setReportId(ids);
      })
   }

   function formatDate(date: string) {
      const time = new Date(date).toLocaleString([], {
        hour12: false,
        dateStyle: "medium",
        timeStyle: "short",
      });
      return time;
   }

   return (
      <IonPage>
         <IonHeader translucent={true} collapse="fade">
         <IonToolbar>
            <IonButtons slot="start">
               <IonBackButton defaultHref="/discuss" text="返回"/>
            </IonButtons>
            <IonTitle>用戶管理</IonTitle>
         </IonToolbar>
         </IonHeader>
         <IonContent>
            <Container>
               <WaitingReportList 
                  waitingReports={reports.waitingReports}
                  reports_ids={reports_ids}
                  showSelected={showSelected}
                  isChecked={isChecked}
                  setChecked={setChecked}
                  setShowSelected={setShowSelected}
                  formatDate={formatDate}
                  fetchData={fetchData}
               />
               <ConfirmedReportList 
                  confirmedReports={reports.confirmedReports}
                  showSelected={showSelected}
                  setShowSelected={setShowSelected}
                  formatDate={formatDate}
               />
            </Container>
         </IonContent>
      </IonPage>
   )
}

export default AdminPanel;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0.5rem 0;

   .reportListContainer {
      width: 95%;
      font-size: 14px;
      margin-top: 1rem;

      ion-button {
         width: 5rem;
         height: 2rem;
         font-size: 14px;
         margin-top: 1rem;
      }

      table {
         width: 100%;
         min-height: 20vh;
         margin-top: 0.5rem;
         background-color: #222;
         border-radius: 0.5rem;

         tr {
            display: flex;
            justify-content: space-around;
            align-items: center;

            td, th {
               display: flex;
               justify-content: center;
               padding: 0.5rem 0;
               width: 25%;

               ion-checkbox {
                  width: 1.1rem;
                  height: 1.1rem;
               }
            }
         }
      }

      .detailContainer {
         max-height: 0;
         overflow: hidden;
         transition: all 0.5s cubic-bezier(0,1,0,1);
      }

      .detailContainer.show {
         height: auto;
         max-height: 9999px;
         transition: all 0.5s cubic-bezier(1,0,1,0);
      }

      .rotate-180 {
         animation: rotation-up 0.3s linear;
         transform: rotate(180deg);
      }

      .rotate-0 {
         animation: rotation-down 0.3s linear;
         transform: rotate(0deg);
      }

      @keyframes rotation-up {
         from {
            transform: rotate(0deg);
         }
         to {
            transform: rotate(180deg);
         }
      }

      @keyframes rotation-down {
         from {
            transform: rotate(180deg);
         }
         to {
            transform: rotate(0deg);
         }
      }
   }
`