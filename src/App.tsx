
import RepoItem, { IRepoItem } from './Components/RepoItem'
import SearchBar from './Components/SearchBar';
import { useRepoStore } from './Store/useRepoStore';

function App() {
  const { repos, reposCount, isLoading, error } = useRepoStore();

  return (
    <div className="m-5">
      <SearchBar />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {reposCount ? repos.map((repo: IRepoItem) => (
          <RepoItem key={repo.id} repo={repo} />
        )) : <p>No repos found</p>}
      </div>
    </div>
  )
}

export default App
