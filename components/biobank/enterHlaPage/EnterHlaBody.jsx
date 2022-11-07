const EnterHlaBody = ({ setHla }) => {
  const submit = (e) => {
    e.preventDefault()

    // let HLAA, HLAB, HLAC, HLADPB, HLADRB
    // if (e.currentTarget[0].value) {
    //     HLAA = JSON.parse(e.currentTarget[0].value) //e.target[0];
    // } else {
    //     HLAA = [0]
    // }
    // if (e.currentTarget[1].value) {
    //     HLAB = JSON.parse(e.currentTarget[1].value)
    // } else {
    //     HLAB = [0]
    // }
    // if (e.currentTarget[2].value) {
    //     HLAC = JSON.parse(e.currentTarget[2].value)
    // } else {
    //     HLAC = [0]
    // }
    // if (e.currentTarget[3].value) {
    //     HLADPB = JSON.parse(e.currentTarget[3].value)
    // } else {
    //     HLADPB = [0]
    // }
    // if (e.currentTarget[4].value) {
    //     HLADRB = JSON.parse(e.currentTarget[4].value)
    // } else {
    //     HLADRB = [0]
    // }

    let HLAA = [2, 123]
    let HLAB = [51, 123]
    let HLAC = [4, 213]
    let HLADPB = [35, 1, 1]
    let HLADRB = [4, 165]
    let HLADQA = [35, 1, 1]

    setHla({
      A: HLAA,
      B: HLAB,
      C: HLAC,
      DPB: HLADPB,
      DRB: HLADRB,
    })
  }

  return (
    <div className="w-full flex flex-col px-36 py-10">
      <div className="text-5xl text-black py-3 font-satoshi">
        Enter HLA Sequences
      </div>
      <div className="text-2xl text-black pb-10 font-satoshi">
        Enter sequence details to find the nearest match
      </div>
      <form className="flex-col w-8/12" onSubmit={submit}>
        <div className="w-full rounded-[20px] border-main border-b-[0.5px] pb-[2rem]">
          <div className="flex justify-between p-5">
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA A"
              >
                <div className="w-3 h-3 mx-2 bg-pinkHLAA rounded" />
                HLA A
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA A"
                placeholder="[x, y, z]"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA B"
              >
                <div className="w-3 h-3 mx-2 bg-orangeHLAB rounded" />
                HLA B
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA B"
                placeholder="[x, y, z]"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA C"
              >
                <div className="w-3 h-3 mx-2 bg-blueHLAC rounded" />
                HLA C
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA C"
                placeholder="[x, y, z]"
              />
            </div>
          </div>
          <div className="flex justify-between p-5">
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA DRB"
              >
                <div className="w-3 h-3 mx-2 bg-greenHLADRB rounded" />
                HLA DRB
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA DRB"
                placeholder="[x, y, z]"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA DPB"
              >
                <div className="w-3 h-3 mx-2 bg-yellowHLADPB rounded" />
                HLA DPB
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA DPB"
                placeholder="[x, y, z]"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="flex items-center font-satoshiMedium text-base text-black mb-[0.4rem]"
                htmlFor="HLA DQA"
              >
                <div className="w-3 h-3 mx-2 bg-purpleHLADQA rounded " />
                HLA DQA
              </label>
              <input
                className="py-3 px-4 font-satoshiRegular text-xl focus:font-satoshiRegular text-main focus:outline-none border-main border-[0.5px] rounded"
                name="HLA DQA"
                placeholder="[x, y, z]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-5">
          <input
            className="flex justify-items-center text-2xl cursor-pointer bg-marketplaceButton font-satoshiBold px-[6rem] mt-[1rem] h-[72px] rounded-full text-black drop-shadow-searchButtonShadow "
            name="submit"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  )
}

export default EnterHlaBody