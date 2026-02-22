# usePopCorn 🍿

![usePopcorn app screenshort](/usePopcorn.png)

usePopcorn is a dynamic movie application that allows users to search for films, view detailed information via the OMDb API, and manage a personalized watched list with custom ratings.

**[Live Preview](https://yuzstack-usepopcorn.netlify.app/)**

## 🛠️ Technical Stack

- **Frontend Library:** React.js
- **Data Source:** OMDb API
- **Styling:** Vanilla CSS

## 🧠 The "Build-to-Verify" Workflow

This project was developed using an incremental, challenge based learning strategy. Instead of following tutorials step by step, I built each feature independently before auditing my logic against industry best practices. This approach helped me identify architectural flaws and refine my state management skills.

## ✨ Key Features

- **Asynchronous Data Fetching:** Implemented real time movie searches using the OMDb API.
- **Advanced Side Effect Management:** Leveraged the `useEffect` hook with an `AbortController` to handle cleanup and prevent memory leaks during rapid data fetching.
- **Custom Hook Architecture:** Abstracted complex fetching logic into a reusable `useMovies` hook to maintain a clean and readable component tree.
- **Resilient Error Handling:** Built custom UI states for loading indicators and network errors to ensure a seamless user experience.
- **Personalized Rating System:** Developed a dedicated rating component to allow users to store and manage their movie reviews.

## 🚀 Getting Started

To run this project locally:

1. Clone the repository: `git clone https://github.com/YuzStack/54_usePopcorn.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
