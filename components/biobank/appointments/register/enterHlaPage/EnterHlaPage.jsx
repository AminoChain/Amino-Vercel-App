import EnterHlaBody from './EnterHlaBody'

const EnterHlaPage = ({ setHla, setSequence }) => {
  return (
    <div className="w-full">
      <EnterHlaBody setHla={setHla} setSequence={setSequence} />
    </div>
  )
}

export default EnterHlaPage
