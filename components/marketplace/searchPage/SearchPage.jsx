import SearchBanner from './SearchBanner'
import SearchBody from './SearchBody'

const SearchPage = ({ setSearch }) => {

  
  return (
    <div className="w-full">
      <SearchBanner />
      <SearchBody setSearch={setSearch}/>
    </div>
  )
}

export default SearchPage
