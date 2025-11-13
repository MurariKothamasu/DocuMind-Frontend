# DocuMind-Frontend 🧠📄

This is the frontend for DocuMind, an intelligent document summarizer. It provides a clean, interactive, and responsive user interface for uploading documents, selecting summary length, and receiving AI-powered summaries and key points.

This application is built to work with the **[DocuMind-Backend](https://github.com/MurariKothamasu/DocuMind-Backend)**.

## ✨ Features

* **Secure Authentication:** Full signup, login, and logout flow using secure, cookie-based sessions.
* **Split-Screen UI:** A responsive, "human-centric" design for login and signup pages.
* **Document Upload:** A drag-and-drop file uploader with visual previews for images and generic file icons.
* **Dynamic Summarization:** Users can select "short," "medium," or "large" summary lengths to send to the backend.
* **Animated Results:** Summaries and key points are displayed in an animated, clean layout, with key points highlighted as tags.
* **Polished Feel:** Smooth page and button animations powered by Framer Motion.

## 🛠️ Tech Stack

This project is built with a modern, professional tech stack:

* **Core:** React (using Vite)
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **API/HTTP:** Axios (pre-configured for cookie-based auth)
* **State Management:** React Context API (for authentication)
* **Icons:** Heroicons

## 🚀 Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

* Node.js (v18 or later recommended)
* `npm` or `yarn`
* A running instance of the [DocuMind-Backend](https://github.com/MurariKothamasu/DocuMind-Backend) on `http://localhost:3000`.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MurariKothamasu/DocuMind-Frontend.git](https://github.com/MurariKothamasu/DocuMind-Frontend.git)
    cd DocuMind-Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file in the project root named `.env`. This is crucial for connecting to your backend.

    ```env
    # The URL of your local backend server
    VITE_API_URL=http://localhost:3000
    ```

4.  **Run the development server:**
    This will start the app, usually on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

Your frontend is now running and connected to your local backend!