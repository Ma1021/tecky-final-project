import { IonText, IonIcon } from "@ionic/react";
import { Report } from '../../pages/adminPanel/AdminPanel';
import { chevronDown } from "ionicons/icons";

interface ReportProps {
   confirmedReports:Array<Report>
   showSelected: number
   setShowSelected: Function
   formatDate: Function
}

const ConfirmedReportList: React.FC<ReportProps> = (props:ReportProps) => {
    const toggle = (index: number) => {    
    if(index == props.showSelected) {
        return props.setShowSelected(-1)
    }
    props.setShowSelected(index)
    }

    return (
        <div className="reportListContainer">
        <IonText style={{fontSize:16, fontWeight:600}}>已確認舉報</IonText>
        <table cellPadding={0} cellSpacing={0}>
           <thead>
              <tr>
                 <th>用戶名</th>
                 <th>舉報類型</th>
                 <th>舉報原因</th>
                 <th>顯示更多</th>
              </tr>
           </thead>
           <tbody>
              {props.confirmedReports.length > 0 ?
                 props.confirmedReports.map((report)=>{ return (<>
                    <tr key={report.id} style={{borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                       <td>{report.to_user_username}</td>
                       <td>{report.target_type === 'answer' ? '答題':'問題'}</td>
                       <td>{report.reason}</td>
                       <td><IonIcon src={chevronDown} className={props.showSelected === report.id ? 'rotate-180' : 'rotate-0'} onClick={()=>toggle(report.id)}/></td>
                    </tr>
                    <div className={props.showSelected === report.id ? "detailContainer show" : "detailContainer"}>
                       <tr>
                          <th>用戶身份</th>
                          <th  style={{width:'30%'}}>舉報日期</th>
                          <th>舉報內容</th>
                       </tr>
                       <tr>
                          <td>{report.to_user_type === 'normal' ? '一般用戶' : 'KOL用戶'}</td>
                          <td style={{width:'30%'}}>{props.formatDate(report.created_at)}</td>
                          <td>{report.content}</td>
                       </tr>
                    </div>
                 </>)}) : <div style={{textAlign:'center', marginTop:'2rem'}}>未有記錄</div>
              }
           </tbody>
        </table>
     </div>
    )
}

export default ConfirmedReportList;