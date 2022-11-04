import DonateSearchSteps from "./donateProgress/DonateSearchSteps"
import DonateStart from "./donateProgress/DonateStart"
import DonateSearch from "./donateProgress/DonateSearch"
import { useState } from "react"

const DonateBody = ({progress, setProgress, barPercent, setBarPercent}) => {

  // switch (progress) {
  //   case 1: setBarPercent('20%')
  //     break;
  //   default:
  //     break;
  // }

  return (
    <div className="w-full">
      { (progress > 0) ?
        <DonateSearchSteps progress={progress} barPercent={barPercent} setBarPercent={setBarPercent}/>
        : null
      }
      {(() => {
        switch (progress) {
          case 0:
            return <DonateStart progress={progress} setProgress={setProgress} />
          case 1:
            return <DonateSearch progress={progress} setProgress={setProgress} />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default DonateBody