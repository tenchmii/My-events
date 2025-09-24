# MY_EVENTS

MY_EVENTS is a web application designed to discover, organize, and participate in cultural events. Inspired by platforms like Shotgun, our goal is to offer a superior, more intuitive, and engaging user experience (UX).

## Project Goals

*   **Event Discovery:** Aggregate events from external sources (OpenDataSoft API).
*   **Outing Organization:** Allow users to create their own social outings based on these events.
*   **Social Interaction:** Foster a community where users can connect and meet.
*   **First-Class UX/UI:** Focus on fluidity, performance, and a modern design.

## Tech Stack

This project is built on a modern and performant full-stack architecture:

*   **Frontend:**
    *   Framework: **Next.js** (with App Router)
    *   Language: **TypeScript**
    *   Styling: **Tailwind CSS**
*   **Backend:**
    *   Framework: **FastAPI**
    *   Language: **Python 3.10+**
    *   Database: **PostgreSQL**
    *   ORM: **SQLAlchemy**
*   **Dependency Management:**
    *   Frontend: **npm**
    *   Backend: **pip** and virtual environments (`venv`)

## Getting Started (Local Development)

Follow these steps to run the project on your machine.

### Prerequisites

*   [Git](https://git-scm.com/)
*   [Node.js LTS (v20.x)](https://nodejs.org/) - Using [nvm](https://github.com/nvm-sh/nvm) is highly recommended.
*   [Python (v3.10+)](https://www.python.org/)
*   [PostgreSQL](https://www.postgresql.org/) - A PostgreSQL database server must be installed and running.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd my-events
    ```

2.  **Set up the Database (PostgreSQL):**
    *   Create a dedicated user and database for the project. Connect to `psql` and run the following commands:
        ```sql
        CREATE USER myevents_user WITH PASSWORD 'your_password';
        CREATE DATABASE my_events_db OWNER myevents_user;
        ```
    *   **Important:** Choose a password without special characters (`@`, `:`, `/`, etc.) to avoid URL parsing issues.

3.  **Set up the Backend:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Create and activate a virtual environment:
        ```bash
        python3 -m venv venv
        source venv/bin/activate  # On macOS/Linux
        # .\venv\Scripts\Activate.ps1 # On Windows PowerShell
        ```
    *   Install Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    *   Create the environment file. It's recommended to copy the example file:
        ```bash
        cp .env.example .env
        ```
    *   Open `backend/.env` and fill in the `DATABASE_URL` and `JWT_SECRET_KEY` variables.

    *   **Apply database migrations:**
        This command creates the necessary tables (e.g., the `users` table).
        ```bash
        alembic upgrade head
        ```

4.  **Set up the Frontend:**
    *   Navigate to the frontend directory from the root:
        ```bash
        cd frontend
        ```
    *   Install Node.js dependencies:
        ```bash
        npm install
        ```
    *   Create the local environment file:
        ```bash
        cp .env.example .env.local
        ```
    *   Open `frontend/.env.local` and fill in `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `NEXTAUTH_SECRET`. You can obtain Google credentials from the [Google Cloud Console](https://console.cloud.google.com/).

### Running the Application

You will need two separate terminals.

1.  **Start the Backend Server (API):**
    *   Open a terminal in the `backend/` directory.
    *   Make sure your virtual environment is activated (`(venv)`).
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`. You can view the interactive documentation at `http://127.0.0.1:8000/docs`.

2.  **Start the Frontend Server (Web App):**
    *   Open a second terminal in the `frontend/` directory.
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. This helps us maintain a clear version history and automate changelog generation.

Examples:
*   `feat: add user authentication`
*   `fix: correct password validation logic`
*   `docs: update README with setup instructions`
*   `style: format code with prettier`
*   `refactor: simplify event filtering component`
*   `test: add unit tests for user service`
*   `chore: upgrade next.js to version 14.1`

1️⃣ TypeScript any issues

You need to fix all any types:

./src/app/api/auth/[...nextauth]/route.ts → lines 82, 93, 94

./src/app/auth/page.tsx → line 64

./src/app/events/[eventId]/CreateOutingButton.tsx → line 54

2️⃣ JSX unescaped characters

You need to escape ' or ":

./src/app/auth/page.tsx → line 157

./src/app/search/page.tsx → lines 65:40, 65:48

3️⃣ <img> tags (Next.js warning)

Next.js recommends using <Image />:

./src/app/components/EventList.tsx → line 16

./src/app/events/[eventId]/page.tsx → lines 86:13, 103:11

./src/app/search/page.tsx → line 20:9

4️⃣ Unused variables / imports

Optional, but good to clean:

./src/app/api/auth/[...nextauth]/route.ts → User is imported but not used

./src/app/search/page.tsx → OdsEventRecord is imported but not used

./src/app/search/page.tsx → events variable is assigned but never used

./src/app/profile/page.tsx → e is defined but never used