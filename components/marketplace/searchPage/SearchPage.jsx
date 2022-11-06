import SearchBanner from './SearchBanner'
import SearchBody from './SearchBody'
import SearchFooter from './SearchFooter'

const SearchPage = ({ setSearch }) => {
  return (
    <div className="w-[100vw]">
      <SearchBanner />
      <SearchBody setSearch={setSearch} />
      <SearchFooter />
    </div>
  )
}

export default SearchPage
