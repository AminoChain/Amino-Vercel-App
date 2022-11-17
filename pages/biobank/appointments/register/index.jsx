import BioBankRegisterPage from '../../../../components/biobank/appointments/register/BioBankRegisterPage'
import { useState } from 'react'

const BioBankRegister = () => {
  const [hla, setHla] = useState()
  const [sequence, setSequence] = useState()

  return (
    <div>
      <BioBankRegisterPage
        setHla={setHla}
        hla={hla}
        setSequence={setSequence}
        sequence={sequence}
      />
    </div>
  )
}

export default BioBankRegister
