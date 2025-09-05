# MY_EVENTS

MY_EVENTS est une application web conçue pour découvrir, organiser et participer à des événements culturels. Inspirée par des plateformes comme Shotgun, notre objectif est de proposer une expérience utilisateur (UX) supérieure, plus intuitive et plus engageante.

## Objectifs du Projet

*   **Découverte d'Événements :** Agréger les événements depuis des sources externes (API OpenAgenda).
*   **Organisation de Sorties :** Permettre aux utilisateurs de créer leurs propres sorties sociales autour de ces événements.
*   **Interaction Sociale :** Créer une communauté où les utilisateurs peuvent échanger et se rencontrer.
*   **UX/UI de Premier Ordre :** Mettre l'accent sur la fluidité, la performance et un design moderne.

## Stack Technique

Ce projet est construit sur une stack full-stack moderne et performante :

*   **Frontend :**
    *   Framework : **Next.js** (avec App Router)
    *   Langage : **TypeScript**
    *   Styling : **Tailwind CSS**
    *   Gestion de l'état : Zustand / React Context
*   **Backend :**
    *   Framework : **FastAPI**
    *   Langage : **Python 3.10+**
    *   Base de données : **PostgreSQL** (à venir)
    *   ORM : **SQLAlchemy** (à venir)
*   **Gestion des dépendances :**
    *   Frontend : **npm**
    *   Backend : **pip** et environnements virtuels (`venv`)

## Démarrage Rapide (Développement Local)

Suivez ces étapes pour lancer le projet sur votre machine.

### Prérequis

*   [Git](https://git-scm.com/)
*   [Node.js LTS (v20.x)](https://nodejs.org/) - Il est fortement recommandé d'utiliser [nvm](https://github.com/nvm-sh/nvm).
*   [Python (v3.11+)](https://www.python.org/)

### Installation

1.  **Cloner le repository :**
    ```bash
    git clone repos
    ```

2.  **Configurer le Backend :**
    ```bash
    # Se placer dans le dossier backend
    cd backend

    # Créer et activer l'environnement virtuel
    python3 -m venv venv
    source venv/bin/activate  # Sur macOS/Linux
    # .\venv\Scripts\Activate.ps1 # Sur Windows PowerShell

    # Installer les dépendances Python
    pip install -r requirements.txt
    ```

3.  **Configurer le Frontend :**
    ```bash
    # Se placer dans le dossier frontend (depuis la racine)
    cd frontend

    # Installer les dépendances Node.js
    npm install

    # Créer le fichier d'environnement local
    # Si .env.example n'existe pas, créez .env.local et ajoutez :
    # NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
    ```

### Lancement

Vous aurez besoin de deux terminaux.

1.  **Lancer le serveur Backend (API) :**
    *   Ouvrez un terminal dans le dossier `backend/`.
    *   Assurez-vous que votre environnement virtuel est activé (`(venv)`).
    ```bash
    uvicorn main:app --reload
    ```
    L'API sera disponible sur `http://127.0.0.1:8000`. Vous pouvez consulter la documentation interactive sur `http://127.0.0.1:8000/docs`.

2.  **Lancer le serveur Frontend (Application Web) :**
    *   Ouvrez un second terminal dans le dossier `frontend/`.
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:3000`.

## Conventions de Commit

Nous utilisons le standard [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Cela nous aide à maintenir un historique de version clair et à automatiser la génération de changelogs.

Exemples :
*   `feat: add user authentication`
*   `fix: correct password validation logic`
*   `docs: update README with setup instructions`
*   `style: format code with prettier`
*   `refactor: simplify event filtering component`
*   `test: add unit tests for user service`
*   `chore: upgrade next.js to version 14.1`