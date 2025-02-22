import { useRepoStore } from "../../Store/useRepoStore";

export interface IRepoItem {
    id: string;
    name: string;
    description?: string;
    ownerName: string;
    stargazersCount: number;
    forksCount: number;
    isStarred: boolean;
}

const RepoItem = ({ repo }: { repo: IRepoItem }) => {
  const { name, description, ownerName, stargazersCount, forksCount, isStarred} = repo;
  const { starRepo, unStarRepo } = useRepoStore();

  return (
      <div className="flex flex-col max-w-sm rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div className="text-xl font-medium text-black line-clamp-2">
                    {name}
                </div>
                <button
                type="button"
                onClick={() => isStarred ? unStarRepo(repo) : starRepo(repo)}
                className="ml-5 rounded-md border border-transparent text-center text-sm transition-all text-slate-600 hover:cursor-pointer hover:bg-slate-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${isStarred ? 'fill-yellow-400' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </button>
            </div>
            <div className="text-gray-500 line-clamp-3 mt-1">{description ?? "No description"}</div>
        </div>
        <div className="flex justify-between mt-1">
            <p className="text-gray-500 font-semibold">By: {ownerName}</p>
            <div className="flex gap-x-5">
                <div className="flex gap-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                    </svg>
                    {stargazersCount}
                </div>
                <div className="flex gap-x-1 flex-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 rotate-270">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>
                    {forksCount}
                </div>
            </div>
        </div>
      </div>
  );
}

export default RepoItem;
