import { create } from "zustand";
import { IRepoItem } from "../Components/RepoItem";

interface IRepoState {
  repos: IRepoItem[];
  reposCount: number;
  isLoading: boolean;
  error: string | null;
  searchRepos: (query: string) => void;
  starRepo: (repo: IRepoItem) => void;
  unStarRepo: (repo: IRepoItem) => void;
  resetSearchResults: () => void;
}

interface IError {
  code: string;
  message: string;
}


export const useRepoStore = create<IRepoState>((set) => {

  const formatRepos = (items: any) => (
    items.map((item: any) => (
      { 
        id: item.id, 
        name: item.name, 
        description: item.description, 
        ownerName: item.owner.login,
        forksCount: item.forks_count, 
        stargazersCount: item.stargazers_count
      }
    ))
  );

  const updateRepoState = (repoId: string, isStarred: boolean, error: string | null = null) => {
    set((state) => ({
      repos: state.repos.map((repo) =>
        repo.id === repoId ? { ...repo, isStarred } : repo
      ),
      error,
    }));
  };

  const checkRateLimit = async () => {
    const token = import.meta.env.VITE_GITHUB_API_TOKEN;
    const response = await fetch("https://api.github.com/rate_limit", {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const data = await response.json();
    return {
      remaining: data.rate.remaining
    };
  };

  const fetchWithRateLimitCheck  = async (url: string, options: RequestInit) => {
    const { remaining } = await checkRateLimit();
  
    if (remaining === 0) {
      set({ 
        repos: [], 
        reposCount: -1,
        error: `Rate limit exceeded. Try again in a few seconds.`,
        isLoading: false
      });
    }
  
    return fetch(url, options);
  };

  return {
    repos: [],
    reposCount: -1,
    isLoading: false,
    error: null,

    resetSearchResults: () => {
      set({ 
        repos: [], 
        reposCount: -1
      })
    },

    searchRepos: (query: string) => {
      set({
        isLoading: true,
        error: null,
      });
      (async () => {
        try {
          const token = import.meta.env.VITE_GITHUB_API_TOKEN;
          const response = await fetchWithRateLimitCheck(
            `https://api.github.com/search/repositories?q=${query}&per_page=10`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok)
            set({
              error: "Failed to search repos, please try again later.",
              isLoading: false,
              repos: [], 
              reposCount: -1
            });

          const data = await response.json();
          if (data.items) {
            set({ 
              repos: formatRepos(data.items),
              reposCount: data.items.length,
              isLoading: false,
              error: null
            });
          }
        } catch (error: unknown) {
          set({ repos: [], reposCount: -1 , error: (error as IError).message, isLoading: false });
        }
      })();
    },

    starRepo: (selectedRepo: IRepoItem) => {
      // optimistic effect
      updateRepoState(selectedRepo.id, true);

      (async () => {
        try {
          const token = import.meta.env.VITE_GITHUB_API_TOKEN;
          await fetchWithRateLimitCheck(
            `https://api.github.com/user/starred/${selectedRepo.ownerName}/${selectedRepo.name}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Length": "0",
              },
            }
          );
        } catch (error: unknown) {
          updateRepoState(selectedRepo.id, false, "Failed to star repo, please try again later.")
        }
      })();
    },

    unStarRepo: (selectedRepo: IRepoItem) => {
      // optimistic effect
      updateRepoState(selectedRepo.id, false);

      (async () => {
        try {
          const token = import.meta.env.VITE_GITHUB_API_TOKEN;
          await fetchWithRateLimitCheck(
            `https://api.github.com/user/starred/${selectedRepo.ownerName}/${selectedRepo.name}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Length": "0",
              },
            }
          );
        } catch (error: unknown) {
          updateRepoState(selectedRepo.id, true, "Failed to unstar repo, please try again later.")
        }
      })();
    },
  };
});
