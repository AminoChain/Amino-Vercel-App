import BioBankRegisterPage from '../../../../components/biobank/appointments/register/BioBankRegisterPage'
import { useState } from 'react'

const BioBankRegister = () => {
  const [hla, setHla] = useState()
  const [sequenceAndData, setSequenceAndData] = useState()

  return (
    <div>
      <BioBankRegisterPage
        setHla={setHla}
        hla={hla}
        setSequenceAndData={setSequenceAndData}
        sequenceAndData={sequenceAndData}
      />
    </div>
  )
}

export default BioBankRegister
