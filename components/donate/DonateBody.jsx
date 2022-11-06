import DonateSearchSteps from './donateProgress/DonateSearchSteps'
import DonateStart from './donateProgress/DonateStart'
import DonateSearch from './donateProgress/DonateSearch'
import DonateBioBankList from './donateProgress/DonateBioBankList'

const DonateBody = ({
  progress,
  setProgress,
  bioBanks,
  setBioBanks,
  location,
  setLocation,
}) => {
  return (
    <div className="w-screen">
      {progress > 0 ? <DonateSearchSteps progress={progress} /> : null}
      {(() => {
        switch (progress) {
          case 0:
            return <DonateStart setProgress={setProgress} />
          case 1:
            return (
              <DonateSearch
                location={location}
                setLocation={setLocation}
                setProgress={setProgress}
                setBioBanks={setBioBanks}
              />
            )
          case 2:
            return (
              <>
                <DonateSearch
                  location={location}
                  setLocation={setLocation}
                  setProgress={setProgress}
                  setBioBanks={setBioBanks}
                />
                <DonateBioBankList
                  location={location}
                  setProgress={setProgress}
                  bioBanks={bioBanks}
                />
              </>
            )
          default:
            return <div>Hello</div>
        }
      })()}
    </div>
  )
}

export default DonateBody
