
GitHub Repository Explorer

Overview
A React-based web application that allows users to search for GitHub repositories, check repository info, and star/unstar repositories using the GitHub API. It is built with React, TypeScript, Zustand for state management, and Tailwind CSS for styling.

Features
- Search for GitHub repositories by name.
- View repository info such as owner, stars, and forks.
- Star and unstar repositories directly from the UI.
- Optimistic updates for a smooth user experience, handling api errors.

Technologies Used
- React (with Vite)
- TypeScript
- Zustand (for state management)
- Tailwind CSS (for styling)

Steps to Install
1. Clone the repository:
git clone https://github.com/yourusername/github-repo-explorer.git
cd github-repo-explorer
2. Install dependencies:
npm install
3. Create an .env file in the root directory and add your GitHub API token:
VITE_GITHUB_API_TOKEN=your_personal_access_token
4. Running the Application
npm run dev
App will launch at http://localhost:5173/.

Please Note: API token is stored in .env and should never be committed to Git.

Future Work
1. Unit testing

Author
Fatma El-Nagar

