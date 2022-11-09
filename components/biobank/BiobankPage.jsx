import {useState} from "react";
//import EnterHlaPage from "./enterHlaPage/EnterHlaPage";
//import DonorApprovePage from "./donorApprovePage/DonorApprovePage";
import BioBankNav from "./BioBankNav";
import BioBankBanner from "./BioBankBanner";
import BioBankAppointmentList from "./appointments/BioBankAppointmentList";

const BiobankPage = ({  }) => {
  
 // const [hla, setHla] = useState()

  return (
    <div className="w-screen">
      <BioBankBanner />
      <BioBankNav />
      <BioBankAppointmentList/>
      {/* { !hla ? (
        <EnterHlaPage setHla={setHla}/>
      ) : (
        <DonorApprovePage hla={hla} biobankAddress={'0x35a5b80732eFe78D171327C39de408227C299AAc'}/>
      )} */}
    </div>
  )
}

export default BiobankPage
