

const DonateScheduleAppointment = ({ bioBank }) => {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let days = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ]

  return (
    <div className="w-3/4 flex flex-col p-20">
      <form>
        <div className="bioBankAppointment rounded-[12px] px-6 py-7">
          <div className="border-b-2">
            <div className=" font-satoshiBold text-[16px] text-black pb-4">
              Book appointment
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-full flex justify-start p-5">
              <div className="flex flex-col px-20 ">
                <div className=" font-satoshiMedium text-black text-[16px]">
                  Date
                </div>
                <div>
                  <select
                    id="months"
                    name="months"
                    className="border p-2 rounded font-satoshiRegular text-black"
                  >
                    {months.map((element) => {
                      return <option  key={element} value={element}>{element}</option>
                    })}
                  </select>
                  <select
                    id="day"
                    name="day"
                    className="border p-2 mx-2 rounded font-satoshiRegular text-black"
                  >
                    {days.map((element) => {
                      return <option key={element} value={element}>{element}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col px-20 ">
                <div className=" font-satoshiMedium text-black text-[16px]">
                  Time
                </div>
                <div>
                  <select
                    id="months"
                    name="months"
                    className="border p-2 rounded font-satoshiRegular text-black"
                  >
                    {months.map((element) => {
                      return <option value={element}>{element}</option>
                    })}
                  </select>
                  <select
                    id="day"
                    name="day"
                    className="border p-2 mx-2 rounded font-satoshiRegular text-black"
                  >
                    {days.map((element) => {
                      return <option value={element}>{element}</option>
                    })}
                  </select>
                </div>
              </div>
              <input type="submit" className=" hover:hidden" />
            </div>
          </div>
        </div>
        <div className="bioBankAppointment rounded-[12px] px-6 py-7 my-4">
          <div className="border-b-2">
            <div className=" font-satoshiBold text-[16px] text-black pb-4">
              Confirmation
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className=" font-satoshiMedium text-black py-4">
              Your appointment is confirmed for Nov 1st, at 10:30 AM
            </div>
            <div className=" font-satoshiMedium text-main">
              Please be on time and carry the valid documents
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-5">
          <input
            className="flex justify-items-center text-2xl cursor-pointer bg-marketplaceButton font-satoshiBold px-[6rem] mt-[1rem] h-[72px] rounded-full text-black drop-shadow-searchButtonShadow "
            name="submit"
            type="submit"
            value="Confirm Booking"
          />
        </div>
      </form>
    </div>
  )
}

export default DonateScheduleAppointment
