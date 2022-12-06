import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonText, IonCheckbox, IonIcon, IonButton } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { chevronDown, chevronUp } from "ionicons/icons";

interface Report {
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
}

const AdminPanel: React.FC = () => {
   const [reports, setReports] = useState({
      waitingReports:[] as Array<Report>,
      confirmedReports:[] as Array<Report>
   });
   const [ isChecked, setChecked ] = useState([] as Array<number>);
   const [ reports_ids, setReportId ] = useState([] as Array<number>);

   useEffect(()=>{
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/report`)
      .then(response => response.json())
      .then((json) => {
         setReports(json);
         const ids = [] as Array<number>;
         for(let report of json.waitingReports) {
            ids.push(report.to_user_id)
         }
         setReportId(ids);
      })
   },[]);

   function formatDate(date: string) {
      const time = new Date(date).toLocaleString([], {
        hour12: false,
        dateStyle: "medium",
        timeStyle: "short",
      });
      return time;
   }

   function handleCheckBox(e:any) {
      const {value, checked} = e.target;
      if(checked) {
         setChecked([...isChecked, value]);
      } else {
         setChecked(isChecked.filter((checked)=> checked !== value));
      }
   }
   
   function handleSubmit() {
      console.log(isChecked);
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
               <div className="reportListContainer">
                  <IonText style={{fontSize:16, fontWeight:600}}>待審批舉報</IonText>
                  <table cellPadding={0} cellSpacing={0}>
                     <thead>
                        <tr>
                           <th>選項</th>
                           <th>用戶名</th>
                           <th>舉報類型</th>
                           <th>舉報原因</th>
                           <th>顯示更多</th>
                        </tr>
                     </thead>
                     <tbody>
                        {reports.waitingReports.length > 0 &&
                           reports.waitingReports.map((report)=>{ return (<>
                              <tr key={report.id} style={{borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                                 <td><IonCheckbox value={report.to_user_id} checked={isChecked.includes(report.to_user_id)} onClick={handleCheckBox}></IonCheckbox></td>
                                 <td>{report.to_user_username}</td>
                                 <td>{report.target_type === 'answer' ? '答題':'問題'}</td>
                                 <td>{report.reason}</td>
                                 <td><IonIcon src={chevronDown}/></td>
                              </tr>
                              <div>
                                 <tr>
                                    <th>用戶身份</th>
                                    <th  style={{width:'30%'}}>舉報日期</th>
                                    <th>舉報內容</th>
                                 </tr>
                                 <tr>
                                    <td>{report.to_user_type === 'normal' ? '一般用戶' : 'KOL用戶'}</td>
                                    <td style={{width:'30%'}}>{formatDate(report.created_at)}</td>
                                    <td>hello</td>
                                 </tr>
                              </div>
                           </>)})
                        }
                     </tbody>
                  </table>
                  <IonButton onClick={handleSubmit}>批準選項</IonButton>
                  <IonButton onClick={() => setChecked([])}>取消選項</IonButton>
                  <IonButton onClick={() => setChecked(reports_ids)}>全選選項</IonButton>
               </div>
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

      ion-button {
         width: 5rem;
         height: 2rem;
         font-size: 14px;
         margin-top: 1rem;
      }

      table {
         width: 100%;
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


   }
`