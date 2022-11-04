
import SearchBanner from './SearchBanner'
import SearchBody from './SearchBody'

const SearchPage = ({ matches, setMatches, search, setSearch }) => {
  return (
    <div className='w-full'>
      <SearchBanner/>
      <SearchBody search={search} setSearch={setSearch}/>
    </div>
  )
}

export default SearchPage
