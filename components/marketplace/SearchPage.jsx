
import SearchBanner from './SearchBanner'
import SearchInput from './SearchInput'

const SearchPage = ({ matches, setMatches, search, setSearch }) => {
  return (
    <div className='w-full'>
      <SearchBanner/>
      <SearchInput search={search} setSearch={setSearch}/>
    </div>
  )
}

export default SearchPage
