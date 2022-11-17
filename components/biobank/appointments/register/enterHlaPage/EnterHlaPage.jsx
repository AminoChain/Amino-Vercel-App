import EnterHlaBody from './EnterHlaBody'

const EnterHlaPage = ({ setHla, setSequenceAndData }) => {
  return (
    <div className="w-full">
      <EnterHlaBody setHla={setHla} setSequenceAndData={setSequenceAndData} />
    </div>
  )
}

export default EnterHlaPage
