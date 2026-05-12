# CodeFix — AI Code Debugger

An AI-powered code debugging and learning tool built by [CodeVidhya](https://www.codevidhya.com) for students and educators. Paste or upload code in 22+ languages, get instant AI-powered debugging, explanations, and adaptive learning recommendations.

> **For educational use only.** See [LICENSE](LICENSE) for details.

---

## Features

- **AI Code Debugger** — Detects and fixes errors using Groq's LLaMA 3.3 70B model with detailed explanations
- **CS Tutor Chat** — Ask follow-up questions about your code, concepts, or errors
- **Run Code Live** — Execute Python, JavaScript, C++, Java and more right in the browser
- **Learning Mode** — Adaptive difficulty and personalized learning paths powered by ML models (IRT, Bayesian Knowledge Tracing)
- **File Upload** — Upload `.py`, `.js`, `.java`, `.cpp`, PDF, and 15+ file formats
- **22+ Languages** — Python, JavaScript, TypeScript, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, SQL, HTML/CSS, and more
- **Session History** — All debug sessions persist in a sidebar for easy access
- **User Authentication** — Signup/login with email and password (JWT-based)
- **Usage Tracking** — 50 debugs per day per user with visual progress bar

---

## Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | React 18, Vite, React Router v6, CSS         |
| Backend     | Python, FastAPI, Groq SDK                     |
| AI Model    | LLaMA 3.3 70B via Groq (ultra-fast inference) |
| Database    | SQLite                                        |
| Auth        | bcrypt + PyJWT (HS256, 7-day token expiry)    |
| ML/NLP      | IRT, Bayesian Knowledge Tracing, NLP Engine   |

---

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo GROQ_API_KEY=your_key_here > .env
echo JWT_SECRET=your-secret-key >> .env

# Start the server
python main.py
```

Backend runs at `http://localhost:8000` — API docs at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:5175`

---

## API Endpoints

| Method | Endpoint              | Auth     | Description                     |
|--------|-----------------------|----------|---------------------------------|
| POST   | `/api/auth/signup`    | No       | Create a new account            |
| POST   | `/api/auth/login`     | No       | Login and get JWT token         |
| GET    | `/api/auth/me`        | Bearer   | Get current user info           |
| POST   | `/api/debug`          | Bearer   | Debug code (JSON body)          |
| POST   | `/api/upload`         | Bearer   | Upload a file and debug it      |
| POST   | `/api/run`            | Bearer   | Execute code (15s timeout)      |
| POST   | `/api/debug-history`  | Bearer   | Get user's debug history        |
| GET    | `/api/languages`      | No       | List supported languages        |
| GET    | `/health`             | No       | Health check                    |

---

## Project Structure

```
code-debugger-main/
├── backend/
│   ├── main.py              # FastAPI app + all endpoints
│   ├── auth.py              # JWT + bcrypt authentication
│   ├── database.py          # SQLite database layer
│   ├── nlp_engine.py        # Groq-powered NLP analysis
│   ├── ml_models.py         # IRT, BKT, adaptive models
│   ├── requirements.txt
│   └── .env                 # API keys (not committed)
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main debugger interface
│   │   ├── App.css
│   │   ├── DebugHistory.jsx # Sidebar with session history
│   │   ├── AppRouter.jsx    # Route definitions
│   │   ├── main.jsx         # Entry point
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── pages/
│   │       ├── LandingPage.jsx
│   │       ├── LandingPage.css
│   │       ├── LoginPage.jsx
│   │       ├── SignupPage.jsx
│   │       └── AuthPages.css
│   └── package.json
├── LICENSE
├── README.md
└── .gitignore
```

---

## License

This software is licensed under a **custom educational license**. It is free to use for educational and non-commercial purposes only. Commercial use, resale, and redistribution for profit are strictly prohibited. See [LICENSE](LICENSE) for the full terms.

Built with care by [CodeVidhya](https://www.codevidhya.com) — Coding Education for Everyone.
