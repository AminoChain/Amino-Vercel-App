import EnterHlaBanner from './EnterHlaBanner'
import EnterHlaBody from './EnterHlaBody'

const EnterHlaPage = ({ setHla }) => {

  
  return (
    <div className="w-full">
      <EnterHlaBanner />
      <EnterHlaBody setHla={setHla}/>
    </div>
  )
}

export default EnterHlaPage
