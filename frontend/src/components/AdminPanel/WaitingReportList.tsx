import { IonText, IonCheckbox, IonIcon, IonButton, useIonToast } from "@ionic/react";
import { Report } from '../../pages/adminPanel/AdminPanel';
import { chevronDown } from "ionicons/icons";

interface ReportProps {
    waitingReports:Array<Report>
    showSelected: number
    reports_ids: Array<number>
    isChecked: Array<number>
    setChecked: Function
    setShowSelected: Function
    formatDate: Function
    fetchData: Function
}

const WaitingReportList: React.FC<ReportProps> = (props:ReportProps) => {
    function handleCheckBox(e:any) {
        const {value, checked} = e.target;
        if(checked) {
           props.setChecked([...props.isChecked, value]);
        } else {
           props.setChecked(props.isChecked.filter((checked)=> checked !== value));
        }
    }

    const [present] = useIonToast();

    const toggle = (index: number) => {    
      if(index == props.showSelected) {
         return props.setShowSelected(-1)
      }
      props.setShowSelected(index)
    }

    function handleSubmit() {         
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/report`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({report_ids:props.isChecked})
      }).then((response) =>{
         if(response.ok) {
            props.fetchData();
            present("成功審批", 1500);
         } else {
            present("請先剔取選項", 1500);
         }
      })
    }

    return (
      
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
              {props.waitingReports.length > 0 ?
                 props.waitingReports.map((report)=>{ return (<>
                    <tr key={report.id} style={{borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                       <td><IonCheckbox value={report.id} checked={props.isChecked.includes(report.id)} onClick={handleCheckBox}></IonCheckbox></td>
                       <td>{report.to_user_username}</td>
                       <td>{report.target_type === 'answer' ? '答題':'問題'}</td>
                       <td>{report.reason}</td>
                       <td><IonIcon src={chevronDown} className={props.showSelected === report.id ? 'rotate-180' : 'rotate-0'} onClick={()=>toggle(report.id)}/></td>
                    </tr>
                    <div className={props.showSelected === report.id ? "detailContainer show" : "detailContainer"}>
                       <thead>
                           <tr>
                              <th>用戶身份</th>
                              <th style={{width:'40%'}}>舉報內容</th>
                              <th>舉報日期</th>
                           </tr>
                       </thead>
                        <tbody>
                           <tr>
                              <td>{report.to_user_type === 'normal' ? '一般用戶' : 'KOL用戶'}</td>
                              <td style={{width:'40%'}}>{report.content}</td>
                              <td>{props.formatDate(report.created_at)}</td>
                           </tr>
                        </tbody>
                    </div>
                 </>)}) : <div style={{textAlign:'center', marginTop:'2rem'}}>未有記錄</div>
              }
           </tbody>
        </table>
        <IonButton onClick={handleSubmit}>批準選項</IonButton>
        <IonButton onClick={() => props.setChecked([])}>取消選項</IonButton>
        <IonButton onClick={() => props.setChecked(props.reports_ids)}>全選選項</IonButton>
     </div>
    )
}

export default WaitingReportList;