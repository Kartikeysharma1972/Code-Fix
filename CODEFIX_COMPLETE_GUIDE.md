# CodeFix — Complete Technical Guide
### From Zero to Google-Level Understanding

**Author:** CodeVidhya Engineering Team
**Purpose:** This document explains every single line of code, every concept, every technology decision, and the full architecture of the CodeFix application. After reading this, you should be able to explain this project in any technical interview, including Google.

---

## TABLE OF CONTENTS

1. [What is CodeFix?](#1-what-is-codefix)
2. [Tech Stack — What and Why](#2-tech-stack--what-and-why)
3. [Prerequisites — What You Must Know](#3-prerequisites--what-you-must-know)
4. [Project Architecture — The Big Picture](#4-project-architecture--the-big-picture)
5. [Backend Deep Dive](#5-backend-deep-dive)
   - 5.1 [requirements.txt — Dependencies](#51-requirementstxt--dependencies)
   - 5.2 [.env — Environment Variables](#52-env--environment-variables)
   - 5.3 [database.py — Data Layer](#53-databasepy--data-layer)
   - 5.4 [auth.py — Authentication System](#54-authpy--authentication-system)
   - 5.5 [main.py — API Server (The Brain)](#55-mainpy--api-server-the-brain)
   - 5.6 [nlp_engine.py — NLP Analysis](#56-nlp_enginepy--nlp-analysis)
   - 5.7 [ml_models.py — Machine Learning Models](#57-ml_modelspy--machine-learning-models)
6. [Frontend Deep Dive](#6-frontend-deep-dive)
   - 6.1 [package.json — Frontend Dependencies](#61-packagejson--frontend-dependencies)
   - 6.2 [vite.config.js — Build Tool Configuration](#62-viteconfigjs--build-tool-configuration)
   - 6.3 [main.jsx — Entry Point](#63-mainjsx--entry-point)
   - 6.4 [AuthContext.jsx — State Management](#64-authcontextjsx--state-management)
   - 6.5 [AppRouter.jsx — Routing](#65-approuterjsx--routing)
   - 6.6 [LandingPage.jsx — Public Homepage](#66-landingpagejsx--public-homepage)
   - 6.7 [LoginPage.jsx & SignupPage.jsx — Auth Forms](#67-loginpagejsx--signuppagejsx--auth-forms)
   - 6.8 [App.jsx — Main Application (The Heart)](#68-appjsx--main-application-the-heart)
   - 6.9 [DebugHistory.jsx — Sidebar](#69-debughistoryjsx--sidebar)
7. [CSS Architecture](#7-css-architecture)
8. [How Everything Connects — Full Request Flow](#8-how-everything-connects--full-request-flow)
9. [Security Concepts](#9-security-concepts)
10. [Database Design](#10-database-design)
11. [API Design Patterns](#11-api-design-patterns)
12. [Concepts You Must Know for Interviews](#12-concepts-you-must-know-for-interviews)
13. [System Architecture Diagram](#13-system-architecture-diagram)
14. [What Google Interviewers Will Ask About This Project](#14-what-google-interviewers-will-ask-about-this-project)

---

## 1. WHAT IS CODEFIX?

CodeFix is an AI-powered code debugging web application. A user pastes their broken code, and the AI finds all the bugs, fixes them, and explains what went wrong — like having a senior developer review your code instantly.

**The core loop:**
```
User writes broken code → Frontend sends it to Backend → Backend sends it to AI (Groq/LLaMA) → AI returns fixed code → Backend sends it back → Frontend shows the diff
```

**Key insight for interviews:** This is a classic **3-tier architecture** (Client → Server → External Service), which is the most common pattern in production software at companies like Google, Amazon, and Meta.

---

## 2. TECH STACK — WHAT AND WHY

### Backend

| Technology | What It Is | Why We Chose It |
|---|---|---|
| **Python** | Programming language | Most popular for AI/ML apps, huge ecosystem, easy to read |
| **FastAPI** | Web framework | Fastest Python framework (async), auto-generates API docs, type-safe with Pydantic |
| **SQLite** | Database | Zero-config, file-based, no separate server needed — perfect for lightweight apps |
| **Groq API** | AI inference provider | Runs LLaMA 3.3 70B model at 10x speed of competitors (hardware accelerated) |
| **OpenAI SDK** | API client library | Groq uses OpenAI-compatible API format, so we reuse the battle-tested OpenAI Python SDK |
| **bcrypt** | Password hashing | Industry standard, used by Google/Facebook/Netflix. Intentionally slow to prevent brute-force |
| **PyJWT** | JSON Web Tokens | Stateless authentication — no sessions stored on server, scales horizontally |
| **Pydantic** | Data validation | Ensures request/response data matches expected types at runtime |
| **Uvicorn** | ASGI server | Production-grade async server that runs FastAPI |
| **pdfplumber** | PDF parser | Extracts text from uploaded PDF files |

### Frontend

| Technology | What It Is | Why We Chose It |
|---|---|---|
| **React 18** | UI library | Component-based, virtual DOM, most used library in the world, used at Google/Meta |
| **Vite** | Build tool | 10-100x faster than Webpack (uses native ES modules), instant hot reload |
| **React Router v6** | Routing library | Client-side navigation without page reloads (SPA behavior) |
| **Context API** | State management | Built into React, no extra library needed. Perfect for auth state that rarely changes |
| **CSS (vanilla)** | Styling | No UI library bloat, full control, smaller bundle size |

### Why NOT other options?

| We Didn't Use | Why Not |
|---|---|
| Django | Too heavy for an API-only backend, includes ORM/admin/templates we don't need |
| Express.js | Python is better for AI/ML integration (Groq SDK, numpy, etc.) |
| PostgreSQL/MySQL | Needs a separate server process, overkill for a single-server app |
| Redux | Overkill for auth-only global state, Context API is simpler |
| Tailwind CSS | Adds build complexity, vanilla CSS gives more control for this scope |
| Next.js | Server-side rendering not needed, Vite is simpler and faster |

---

## 3. PREREQUISITES — WHAT YOU MUST KNOW

Before you can fully understand this codebase, you need these concepts:

### Programming Fundamentals
- **Variables, Functions, Loops, Conditionals** — basic in both Python and JavaScript
- **Object-Oriented Programming** — classes, methods, inheritance (Python's `class DebuggerDatabase`)
- **Asynchronous Programming** — `async/await` in both Python and JavaScript (this is critical)

### Web Fundamentals
- **HTTP Protocol** — GET, POST, status codes (200, 400, 401, 404, 500)
- **REST API** — endpoints, request/response, JSON format
- **CORS** — Cross-Origin Resource Sharing (why frontend on port 5175 can talk to backend on port 8000)
- **Client-Server Model** — browser sends requests, server processes and responds

### JavaScript/React Concepts
- **JSX** — HTML-like syntax in JavaScript (`<div className="app">`)
- **Components** — reusable UI building blocks (functions that return JSX)
- **Hooks** — `useState`, `useEffect`, `useContext`, `useRef`, `useCallback`
- **Props** — data passed from parent to child component
- **Context API** — sharing state across the entire component tree without prop drilling
- **SPA (Single Page Application)** — one HTML page, JavaScript handles all navigation

### Python/Backend Concepts
- **Decorators** — `@app.post("/api/debug")` — adds behavior to functions
- **Type Hints** — `def login(request: LoginRequest)` — tells Python what types to expect
- **Environment Variables** — configuration stored outside code (API keys, secrets)
- **SQL** — `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE` — database operations

### Security Concepts
- **Hashing** — one-way transformation (password → hash, but hash → password is impossible)
- **JWT (JSON Web Token)** — encoded token containing user identity, verified by server
- **Bearer Token** — token sent in HTTP header to prove identity
- **CORS** — browser security that blocks cross-origin requests unless server allows it

---

## 4. PROJECT ARCHITECTURE — THE BIG PICTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                              │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  React Application (SPA)                                     │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │   │
│  │  │ Landing  │  │  Login   │  │  Signup  │  │  App     │    │   │
│  │  │  Page    │  │  Page    │  │  Page    │  │ (Debug)  │    │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │   │
│  │                      ▲                          ▲            │   │
│  │                      │                          │            │   │
│  │               ┌──────┴──────────────────────────┴──────┐     │   │
│  │               │         AuthContext (Global State)      │     │   │
│  │               │   user | token | login | signup | logout│     │   │
│  │               └────────────────────────────────────────┘     │   │
│  │                              │                               │   │
│  │                     AppRouter (Routes)                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                      │
│                    HTTP Requests (fetch)                             │
│                    Authorization: Bearer <token>                     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     BACKEND SERVER (FastAPI)                          │
│                     http://localhost:8000                             │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                    CORS Middleware                             │   │
│  │         (Allows frontend on different port to connect)        │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Auth     │  │ Debug    │  │ Chat     │  │ History/Usage    │    │
│  │ Endpoints│  │ Endpoint │  │ Endpoint │  │ Endpoints        │    │
│  │ /signup  │  │ /debug   │  │ /chat    │  │ /save-debug      │    │
│  │ /login   │  │ /upload  │  │ /search  │  │ /debug-history   │    │
│  │ /me      │  │ /run     │  │          │  │ /check-usage     │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────────────┘    │
│       │              │              │              │                  │
│  ┌────┴─────┐   ┌────┴──────┐  ┌───┴────┐   ┌────┴─────┐           │
│  │ auth.py  │   │ Groq API  │  │Groq API│   │database  │           │
│  │ (bcrypt  │   │ (LLaMA    │  │(LLaMA  │   │.py       │           │
│  │  + JWT)  │   │  3.3 70B) │  │ 3.3)   │   │(SQLite)  │           │
│  └──────────┘   └───────────┘  └────────┘   └──────────┘           │
│                                                    │                 │
│                                              ┌─────┴─────┐          │
│                                              │ debugger  │          │
│                                              │ .db file  │          │
│                                              └───────────┘          │
└──────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  Groq Cloud API (https://api.groq.com/openai/v1)              │  │
│  │  Model: LLaMA 3.3 70B Versatile                               │  │
│  │  Purpose: AI code analysis, debugging, chat, search           │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

**Key architecture pattern:** This is a **3-tier architecture**:
1. **Presentation Tier** (React) — what the user sees
2. **Application Tier** (FastAPI) — business logic, auth, data processing
3. **Data Tier** (SQLite + Groq API) — data storage and AI inference

---

## 5. BACKEND DEEP DIVE

### 5.1 requirements.txt — Dependencies

```
fastapi>=0.100.0           # Web framework
uvicorn[standard]>=0.24.0  # ASGI server to run FastAPI
openai>=1.0.0              # SDK to talk to Groq (OpenAI-compatible)
pdfplumber>=0.10.0         # Extract text from PDF files
python-multipart>=0.0.6    # Handle file uploads (multipart/form-data)
pydantic>=2.0.0            # Data validation and serialization
python-dotenv>=1.0.0       # Load .env file into os.environ
numpy>=1.24.0              # Math library for ML models (IRT, BKT)
bcrypt>=4.0.0              # Password hashing
PyJWT>=2.8.0               # JSON Web Token encoding/decoding
```

**Concept: Dependency Management**
- `pip install -r requirements.txt` reads this file and installs all packages
- `>=0.100.0` means "version 0.100.0 or higher" — allows compatible updates
- This is Python's equivalent of `package.json` in Node.js
- In production, you might use `pip freeze > requirements.txt` to lock exact versions

**Why each one matters:**
- **fastapi** — We could use Flask, but FastAPI is 3-5x faster (async), has automatic API docs, and enforces type safety
- **uvicorn** — FastAPI is just a library; it needs a server to actually listen on a port. Uvicorn is that server.
- **openai** — Groq intentionally made their API compatible with OpenAI's SDK, so we don't need a separate `groq` package
- **bcrypt** — Never store passwords as plain text. bcrypt is the gold standard because it's intentionally slow (prevents brute-force attacks)
- **PyJWT** — Alternative to session-based auth. JWTs are stateless — the server doesn't need to store sessions in memory

---

### 5.2 .env — Environment Variables

```
GROQ_API_KEY=gsk_xxxxx        # API key for Groq (like a password for their service)
GROQ_MODEL=llama-3.3-70b-versatile  # Which AI model to use
HOST=0.0.0.0                  # Listen on all network interfaces
PORT=8000                     # Which port the server runs on
MAX_UPLOAD_MB=10              # Maximum file upload size
ALLOWED_ORIGINS=*             # Which domains can call our API (* = everyone)
JWT_SECRET=codevidhya-codefix-secret-key-2024-secure-token-generation
```

**Concept: Environment Variables**
Environment variables store configuration OUTSIDE your code. This is one of the **12-Factor App** principles (used at Google, Netflix, Heroku).

**Why not hardcode these values?**
1. **Security** — API keys in code get committed to Git and become public
2. **Flexibility** — Different values for development vs production vs testing
3. **Deployment** — Cloud platforms (Render, AWS, GCP) inject env vars, not files

**How it works in our code:**
```python
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).parent / ".env")  # Reads .env file
OPENAI_API_KEY = os.getenv("GROQ_API_KEY", "")           # Gets the value
```

`os.getenv("KEY", "default")` — returns the value of KEY, or "default" if not found.

**HOST = 0.0.0.0 explained:**
- `127.0.0.1` (localhost) = only accepts connections from this machine
- `0.0.0.0` = accepts connections from any IP address (needed for Docker/deployment)

---

### 5.3 database.py — Data Layer

This file handles ALL database operations. It follows the **Repository Pattern** — the rest of the code never writes SQL directly, it calls methods like `db.create_user()`.

#### The Database Engine: SQLite

```python
import sqlite3

class DebuggerDatabase:
    def __init__(self):
        self.db_path = Path(__file__).parent / "debugger.db"
        self.init_db()
```

**What is SQLite?**
- A database stored in a single file (`debugger.db`)
- No separate server process needed (unlike MySQL/PostgreSQL)
- Built into Python's standard library
- Used by: Android (every phone), Chrome, Firefox, iOS, Skype, iTunes
- Can handle millions of rows and hundreds of concurrent readers

**When to use SQLite vs PostgreSQL:**
- SQLite: Single server, <100 concurrent writers, <1TB data
- PostgreSQL: Multiple servers, high write concurrency, need advanced features (JSON queries, full-text search)

#### Table Creation (Schema Design)

```python
def init_db(self):
    conn = sqlite3.connect(self.db_path)
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS debug_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            code TEXT NOT NULL,
            language TEXT,
            errors_found TEXT,
            fixes_applied TEXT,
            explanation TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
```

**SQL Concepts Explained:**

- `CREATE TABLE IF NOT EXISTS` — Creates the table only if it doesn't already exist. This makes it safe to call every time the server starts.
- `INTEGER PRIMARY KEY AUTOINCREMENT` — Each row gets a unique ID, auto-incrementing (1, 2, 3, ...)
- `TEXT NOT NULL` — A string field that cannot be empty/null
- `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` — Automatically stores the current date/time when a row is created
- `TEXT UNIQUE NOT NULL` — The value must be unique across all rows (used for email in users table)

**The Users Table:**
```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique user ID
    email TEXT UNIQUE NOT NULL,              -- No two users can have same email
    password_hash TEXT NOT NULL,             -- bcrypt hash, NEVER plain password
    display_name TEXT NOT NULL,              -- User's name for display
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,                   -- Updated on each login
    anonymous_id TEXT                        -- For migrating pre-auth data
);
```

#### Key Methods

**create_user():**
```python
def create_user(self, email, password_hash, display_name, anonymous_id=None):
    conn = sqlite3.connect(self.db_path)
    c = conn.cursor()
    try:
        c.execute('''
            INSERT INTO users (email, password_hash, display_name, anonymous_id)
            VALUES (?, ?, ?, ?)
        ''', (email, password_hash, display_name, anonymous_id))
        user_id = c.lastrowid   # Get the auto-generated ID
        conn.commit()           # Save to disk
        return user_id
    except sqlite3.IntegrityError:  # Email already exists (UNIQUE constraint)
        raise ValueError("Email already registered")
    finally:
        conn.close()            # ALWAYS close the connection
```

**Critical concepts here:**

1. **Parameterized Queries** (`VALUES (?, ?, ?, ?)`) — NEVER do `f"INSERT ... VALUES ('{email}')"`. That's **SQL Injection** — the #1 web security vulnerability. The `?` placeholders let SQLite safely escape user input.

2. **try/except/finally** — Exception handling pattern:
   - `try` — attempt the operation
   - `except IntegrityError` — handle duplicate email gracefully
   - `finally` — close connection no matter what (even if an error occurred)

3. **conn.commit()** — SQLite uses transactions. Changes aren't saved until you call `commit()`. This is **ACID compliance** (Atomicity, Consistency, Isolation, Durability).

4. **c.lastrowid** — After INSERT, this returns the auto-generated ID of the new row.

**check_usage() — Rate Limiting:**
```python
def check_usage(self, user_id):
    conn = sqlite3.connect(self.db_path)
    c = conn.cursor()
    today = datetime.now().strftime('%Y-%m-%d')
    c.execute('SELECT count FROM usage_tracking WHERE user_id = ? AND date = ?',
              (user_id, today))
    row = c.fetchone()
    conn.close()
    if row:
        return {"count": row[0], "limit": 50, "remaining": max(0, 50 - row[0])}
    return {"count": 0, "limit": 50, "remaining": 50}
```

This implements a **daily rate limit** — each user can debug 50 times per day. The usage resets at midnight because we check by date string.

---

### 5.4 auth.py — Authentication System

This is one of the most important files for interviews. Authentication is asked in every system design interview.

#### Password Hashing with bcrypt

```python
import bcrypt

def hash_password(plain: str) -> str:
    return bcrypt.hashpw(
        plain.encode("utf-8"),       # Convert string to bytes
        bcrypt.gensalt(rounds=12)    # Generate random salt with 12 rounds
    ).decode("utf-8")               # Convert bytes back to string for storage

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(
        plain.encode("utf-8"),
        hashed.encode("utf-8")
    )
```

**What is hashing?**
Hashing is a ONE-WAY mathematical function. Given "password123", bcrypt produces something like `$2b$12$LJ3m4ys...` — but you CANNOT reverse it back to "password123".

**Why not encrypt instead of hash?**
Encryption is TWO-WAY (encrypt ↔ decrypt). If someone steals your encryption key, they can decrypt every password. With hashing, even if someone steals your entire database, they can't recover passwords.

**What is a salt?**
A random string added to the password BEFORE hashing. Without salt:
- "password123" → always produces the same hash
- Attackers can use pre-computed tables (**rainbow tables**) to crack it

With salt:
- "password123" + "random_salt_1" → unique hash 1
- "password123" + "random_salt_2" → unique hash 2
- Even identical passwords produce different hashes

**What are rounds (12)?**
How many times bcrypt re-hashes the result. More rounds = slower = more secure.
- 10 rounds ≈ 100ms per hash
- 12 rounds ≈ 250ms per hash
- 14 rounds ≈ 1 second per hash

This is intentional — a user waits 250ms once during login (unnoticeable), but an attacker trying 1 billion passwords would need 250 million seconds (8 years).

#### JWT (JSON Web Tokens)

```python
import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "codefix-fallback-dev-secret-change-in-production-2024")
JWT_ALGORITHM = "HS256"
TOKEN_EXPIRY_DAYS = 7

def create_token(user_id: int, email: str) -> str:
    payload = {
        "sub": str(user_id),      # "subject" — who this token is for
        "email": email,            # Extra data we want to carry
        "exp": datetime.utcnow() + timedelta(days=TOKEN_EXPIRY_DAYS),  # Expiration
        "iat": datetime.utcnow(),  # "issued at" — when token was created
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
```

**What is a JWT?**
A JWT is a string like: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1In0.abc123`

It has 3 parts separated by dots:
1. **Header** (`eyJhbGci...`) — says "this is a JWT signed with HS256"
2. **Payload** (`eyJzdWIi...`) — the actual data (user_id, email, expiry)
3. **Signature** (`abc123`) — proves the token wasn't tampered with

**How JWT authentication works (the full flow):**
```
1. User sends email + password to /api/auth/login
2. Server verifies password with bcrypt
3. Server creates JWT with user_id inside, signs it with JWT_SECRET
4. Server sends JWT back to the browser
5. Browser stores JWT in localStorage
6. For every future request, browser sends: Authorization: Bearer <JWT>
7. Server decodes JWT, verifies signature, extracts user_id
8. Server knows who the user is WITHOUT checking a database
```

**Why JWT instead of sessions?**
- **Sessions** — Server stores session data in memory/database. Every request requires a database lookup.
- **JWT** — Server stores NOTHING. The token itself contains the user info. This is **stateless**.
- Stateless = easier to scale horizontally (add more servers)

**HS256 Algorithm:**
- HMAC (Hash-based Message Authentication Code) + SHA-256
- Uses a single secret key for both signing and verification
- Alternative: RS256 uses public/private key pair (used when multiple services verify tokens)

#### Middleware — Protecting Routes

```python
def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = auth_header[7:]   # Remove "Bearer " prefix (7 characters)
    return decode_token(token)
```

This function is used as a **FastAPI Dependency**:
```python
@app.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    ...
```

**Concept: Dependency Injection**
`Depends(get_current_user)` tells FastAPI: "Before running this endpoint, run `get_current_user` first. If it raises an error, don't run the endpoint. If it succeeds, pass the result as `current_user`."

This is the same pattern Google uses in their backend services. It's clean, testable, and reusable.

---

### 5.5 main.py — API Server (The Brain)

This is the biggest file (900+ lines). Let me break it down section by section.

#### App Initialization

```python
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).parent / ".env")
```
**Why load_dotenv FIRST?** — Other modules (nlp_engine.py) read env vars when imported. If we import them before loading .env, they'll get empty values.

```python
client = OpenAI(api_key=OPENAI_API_KEY, base_url="https://api.groq.com/openai/v1")
```
**The Groq trick:** Groq made their API 100% compatible with OpenAI's format. So we use the OpenAI Python SDK but point it to Groq's servers. Same code works with OpenAI, Groq, or any compatible provider.

```python
app = FastAPI(title="Coding Assistant API", version="3.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,    # Which websites can call us
    allow_credentials=True,            # Allow cookies/auth headers
    allow_methods=["*"],               # Allow GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],               # Allow any HTTP headers
)
```

**Concept: CORS (Cross-Origin Resource Sharing)**

Without CORS, a browser running code from `localhost:5175` CANNOT make HTTP requests to `localhost:8000` — the browser blocks it for security.

Why? Imagine you're logged into your bank at `bank.com`. A malicious site `evil.com` could make requests to `bank.com` using YOUR cookies, stealing your money. CORS prevents this by requiring the server to explicitly allow cross-origin requests.

Our backend says `allow_origins=["*"]` which means "allow ANY website to call me." In production, you'd restrict this to your actual domain.

#### Pydantic Models — Request/Response Validation

```python
from pydantic import BaseModel

class DebugRequest(BaseModel):
    code: str
    language: Optional[str] = "auto-detect"

class DebugResponse(BaseModel):
    original_code: str
    debugged_code: str
    language: str
    errors_found: list[str]
    fixes_applied: list[str]
    explanation: str
```

**What Pydantic does:**
When someone sends a POST request to `/api/debug`, FastAPI automatically:
1. Parses the JSON body
2. Validates it matches `DebugRequest` (has `code` field, it's a string, etc.)
3. If validation fails, returns a 422 error with details
4. If it passes, creates a Python object with typed attributes

**Why this matters:**
Without Pydantic, you'd write 20+ lines of manual validation:
```python
# Without Pydantic (ugly, error-prone):
data = await request.json()
if "code" not in data:
    raise HTTPException(400, "Missing code field")
if not isinstance(data["code"], str):
    raise HTTPException(400, "Code must be a string")
# ... and on and on
```

With Pydantic, it's automatic and type-safe.

#### The Debug Endpoint — Core Feature

```python
@app.post("/api/debug", response_model=DebugResponse)
async def debug_code(request: DebugRequest):
```

`@app.post("/api/debug")` is a **decorator**. It tells FastAPI: "When someone sends a POST request to /api/debug, call this function."

**async def** — This function is **asynchronous**. While waiting for Groq's AI response (which takes 1-3 seconds), the server can handle other requests. Without async, the server would be completely blocked.

**The AI Prompt:**
```python
def build_debug_prompt(code, language):
    return f"""You are a coding assistant helping students debug their code.
    Analyze the {language} code below, find ALL bugs, and return a fixed version.

    CODE:
    {code}

    Return ONLY valid JSON (no markdown):
    {{
      "language": "<language name>",
      "debugged_code": "<complete fixed code>",
      "errors_found": ["<error 1>"],
      "fixes_applied": ["<fix 1>"],
      "explanation": "<detailed friendly summary>"
    }}"""
```

**Concept: Prompt Engineering**
This is how you talk to AI models. Key principles:
1. **Be specific** — "Return ONLY valid JSON" prevents the AI from adding markdown
2. **Give examples** — Show the exact JSON structure you want
3. **Set constraints** — "errors_found and fixes_applied must be same length"
4. **Define the role** — "You are a coding assistant helping students"

The AI returns a JSON string, which we parse:

```python
completion = client.chat.completions.create(
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant..."},
        {"role": "user", "content": prompt},
    ],
    model=OPENAI_MODEL,      # "llama-3.3-70b-versatile"
    temperature=0.1,          # Low = more deterministic, less creative
    max_tokens=4096,          # Maximum response length
)
```

**Temperature explained:**
- `0.0` — Always picks the most likely next word (deterministic)
- `0.1` — Almost deterministic, tiny randomness (good for code — we want accuracy)
- `0.5` — Balanced (used for chat — want some variety)
- `1.0` — Very creative/random (good for stories, bad for code)

**The parse_response function:**
```python
def parse_response(text):
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r'^```[a-z]*\s*', '', cleaned)  # Remove ```json
        cleaned = re.sub(r'\s*```$', '', cleaned)          # Remove closing ```
    try:
        return json.loads(cleaned, strict=False)
    except json.JSONDecodeError:
        pass
    match = re.search(r'\{[\s\S]*\}', cleaned)  # Find JSON in response
    if match:
        return json.loads(match.group(), strict=False)
    raise ValueError("Could not parse response as JSON")
```

This is **defensive programming** — AI models sometimes add markdown code fences (```json...```) around their response even when told not to. This function handles that gracefully with multiple fallback strategies.

#### File Upload Endpoint

```python
@app.post("/api/upload", response_model=DebugResponse)
async def upload_and_debug(file: UploadFile = File(...), language: Optional[str] = Form("auto-detect")):
    file_bytes = await file.read()
    if len(file_bytes) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail=f"File too large. Max {MAX_UPLOAD_MB} MB.")
```

**Concept: multipart/form-data**
When you upload a file through a browser, it's sent as `multipart/form-data` (not JSON). FastAPI handles this with `UploadFile` and `File(...)`.

- `File(...)` — The `...` means "required" (Pydantic syntax)
- `Form("auto-detect")` — A form field with default value
- `await file.read()` — Reads the file content asynchronously

#### Code Execution Endpoint

```python
@app.post("/api/run")
async def run_code(request: RunRequest):
```

This endpoint actually RUNS user code on the server. This is extremely dangerous and requires careful sandboxing.

**Security measures:**
1. **Timeout** — Code is killed after 15 seconds (prevents infinite loops)
2. **subprocess** — Runs in a separate process (not in the server process)
3. **Input sanitization** — The code is written to a temp file, not passed as a shell argument

**Concept: subprocess**
```python
import subprocess
result = subprocess.run(
    ["python", temp_file],
    capture_output=True,     # Capture stdout and stderr
    text=True,               # Return strings, not bytes
    timeout=15,              # Kill after 15 seconds
)
```

In a production system (like LeetCode, HackerRank), code execution happens in **Docker containers** or **VMs** for full isolation. Our approach is simpler but less secure — acceptable for a school tool.

#### Auth Endpoints

```python
@app.post("/api/auth/signup")
async def signup(request: SignupRequest):
    email = request.email.strip().lower()    # Normalize email
    pw_hash = hash_password(request.password) # Hash password with bcrypt
    user_id = db.create_user(email, pw_hash, request.display_name.strip(), request.anonymous_id)
    token = create_token(user_id, email)      # Generate JWT
    return AuthResponse(token=token, user_id=user_id, email=email, display_name=request.display_name.strip())
```

**The signup flow:**
1. Validate email format and password length
2. Hash password with bcrypt (NEVER store plain text)
3. Insert into database (fails if email exists — UNIQUE constraint)
4. If user had anonymous data, migrate it to the new account
5. Create JWT token
6. Return token to the frontend

**Data migration:**
```python
if request.anonymous_id:
    db.migrate_anonymous_data(request.anonymous_id, str(user_id))
```
Before auth existed, users had anonymous IDs stored in localStorage. When they create an account, we update all their old debug sessions to link to their new user ID. This is a common pattern when adding auth to an existing product.

---

### 5.6 nlp_engine.py — NLP Analysis

```python
class NLPEngine:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("GROQ_API_KEY", ""),
            base_url="https://api.groq.com/openai/v1"
        )
        self.model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
```

**What is NLP?**
Natural Language Processing — teaching computers to understand human language.

This module provides:
- **Question Analysis** — Understands what a student is asking
- **Intent Detection** — Is the student asking a question, reporting a bug, or requesting help?
- **Sentiment Analysis** — Is the student frustrated, confused, or confident?
- **Topic Extraction** — What CS topics are involved (arrays, loops, recursion)?

**How it works:** Each analysis sends a specifically crafted prompt to the AI model and parses the structured response. This is called **LLM-as-a-service** pattern — using a large language model as a general-purpose NLP engine instead of training specialized models.

---

### 5.7 ml_models.py — Machine Learning Models

This file implements 4 ML models for adaptive learning.

#### Item Response Theory (IRT)

```python
class ItemResponseTheory:
    def __init__(self):
        self.theta = 0.0  # Student ability estimate

    def probability_correct(self, difficulty, discrimination=1.0, guessing=0.25):
        exponent = discrimination * (self.theta - difficulty)
        return guessing + (1 - guessing) / (1 + np.exp(-exponent))
```

**What is IRT?**
A mathematical model from psychometrics (used in GRE, SAT, GMAT). It estimates:
- How skilled a student is (theta/ability)
- How hard a question is (difficulty)
- The probability that a student of ability X will solve a problem of difficulty Y

**The math:** `P(correct) = guessing + (1 - guessing) / (1 + e^(-a(θ - b)))`
- θ (theta) = student ability
- b = item difficulty
- a = discrimination (how well the item distinguishes between students)
- guessing = probability of getting it right by chance (0.25 for 4-choice MCQ)

This is a **sigmoid function** — the same function used in logistic regression and neural networks.

#### Bayesian Knowledge Tracing (BKT)

```python
class BayesianKnowledgeTracing:
    def __init__(self):
        self.p_know = 0.3     # Prior probability of knowing the skill
        self.p_learn = 0.1    # Probability of learning on each attempt
        self.p_slip = 0.1     # Probability of making a mistake even when you know it
        self.p_guess = 0.25   # Probability of guessing correctly
```

**What is BKT?**
A Hidden Markov Model that tracks whether a student has "mastered" a skill based on their response history. Used by Khan Academy, Duolingo, and Coursera.

- After each correct answer: confidence that the student knows the skill increases
- After each wrong answer: confidence decreases
- `p_learn` models the idea that a student can learn FROM making mistakes

#### Difficulty Adaptor

Adjusts problem difficulty based on student performance:
- Getting problems right? → Increase difficulty
- Getting problems wrong? → Decrease difficulty
- This creates a **personalized learning experience** — problems are always at the right challenge level

#### Learning Path Recommender

Recommends what to study next based on:
- Current mastery levels across topics
- Which prerequisites are met
- Which topics have the highest priority (low mastery + high importance)

---

## 6. FRONTEND DEEP DIVE

### 6.1 package.json — Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",           // UI library
    "react-dom": "^18.3.1",      // React's DOM renderer
    "react-router-dom": "^7.15.0" // Client-side routing
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",  // Vite plugin for React (JSX, Fast Refresh)
    "vite": "^6.0.7"                    // Build tool
  }
}
```

**dependencies vs devDependencies:**
- `dependencies` — needed in production (shipped to users)
- `devDependencies` — only needed during development (build tools, linters)

**Concept: Semantic Versioning (SemVer)**
`^18.3.1` means:
- Major: 18 (breaking changes)
- Minor: 3 (new features, backwards compatible)
- Patch: 1 (bug fixes)
- `^` = allow minor and patch updates (^18.3.1 accepts 18.4.0 but not 19.0.0)

---

### 6.2 vite.config.js — Build Tool Configuration

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
```

**What is Vite?**
A build tool that:
1. **In development** — Serves files using native ES modules (no bundling = instant start)
2. **In production** — Bundles everything with Rollup (optimized, minified)

**The proxy configuration:**
```javascript
proxy: {
  "/api": {
    target: "http://localhost:8000",
    changeOrigin: true,
  }
}
```

When the frontend (port 5175) makes a request to `/api/debug`, Vite intercepts it and forwards it to `http://localhost:8000/api/debug`. This solves CORS issues during development.

**Why?** In production, both frontend and backend are served from the same domain (no CORS issue). The proxy simulates this during development.

**strictPort: true** — If port 5175 is already in use, Vite will throw an error instead of silently picking another port. This prevents confusion.

---

### 6.3 main.jsx — Entry Point

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**This is the "tree of providers" pattern:**
```
React.StrictMode          → Development warnings
  └── BrowserRouter       → Enables URL-based routing
       └── AuthProvider   → Makes auth state available everywhere
            └── AppRouter → Decides which page to show
```

**Each wrapper explained:**

1. **React.StrictMode** — Development-only wrapper that warns about:
   - Deprecated lifecycle methods
   - Unexpected side effects
   - Legacy string refs
   - It renders components TWICE in dev mode to catch bugs (removed in production)

2. **BrowserRouter** — Uses the HTML5 History API (`pushState`) to change the URL without reloading the page. This is what makes React a **Single Page Application (SPA)**.

3. **AuthProvider** — A **Context Provider** that wraps the entire app, making `user`, `token`, `login()`, `signup()`, `logout()` available to ANY component below it.

4. **ReactDOM.createRoot** — React 18's new rendering API. Uses **concurrent rendering** — React can interrupt rendering to handle urgent updates (like user typing).

---

### 6.4 AuthContext.jsx — State Management

This is the authentication brain of the frontend.

```jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
```

**Concept: React Context API**

The problem Context solves — **prop drilling**:
```
// WITHOUT Context — passing user through 5 levels of components:
App → Layout → Header → UserMenu → UserName (needs user.name)

// WITH Context — any component can access it directly:
App (AuthProvider wraps everything)
UserName → useAuth() → gets user.name directly
```

**How Context works:**
1. `createContext(null)` — Creates a "channel" for data
2. `AuthProvider` — The "broadcaster" that sends data into the channel
3. `useAuth()` — Any component calls this to "tune in" and receive data

```jsx
const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : window.location.origin;
```

**Why this check?**
- In development: frontend is on `localhost:5175`, backend is on `localhost:8000`
- In production: both are served from the same origin
- This makes the code work in both environments without changing anything

#### The AuthProvider Component

```jsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);           // Current user object or null
  const [token, setToken] = useState(
    () => localStorage.getItem("auth_token")         // Initialize from storage
  );
  const [loading, setLoading] = useState(true);      // True while checking token
```

**Concept: Lazy Initialization**
`useState(() => localStorage.getItem("auth_token"))` — The function is only called ONCE when the component first mounts. If we wrote `useState(localStorage.getItem("auth_token"))`, it would call localStorage on every re-render (wasteful).

#### Token Validation on Page Load

```jsx
useEffect(() => {
  if (!token) {
    setLoading(false);
    return;
  }
  fetch(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((r) => {
      if (!r.ok) throw new Error("Invalid token");
      return r.json();
    })
    .then((data) => setUser(data))
    .catch(() => {
      localStorage.removeItem("auth_token");
      setToken(null);
    })
    .finally(() => setLoading(false));
}, [token]);
```

**What happens when a user opens the app:**
1. React renders, `token` is loaded from localStorage
2. `useEffect` fires because `token` changed
3. If no token → not logged in, stop loading
4. If token exists → call `/api/auth/me` to verify it's still valid
5. If valid → set user data (logged in!)
6. If invalid (expired/tampered) → clear token, user is logged out
7. Set `loading = false` either way

**Concept: useEffect**
`useEffect(callback, [dependencies])` — Runs `callback` when any value in the dependency array changes. It's React's way of handling **side effects** (API calls, localStorage, timers).

- `useEffect(() => {}, [])` — Runs ONCE on mount (empty dependency array)
- `useEffect(() => {}, [token])` — Runs whenever `token` changes
- `useEffect(() => {})` — Runs on EVERY render (usually a bug)

#### The login Function

```jsx
const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, anonymous_id: getAnonymousId() }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Login failed");
  localStorage.setItem("auth_token", data.token);
  localStorage.removeItem("debugger_user_id");
  setToken(data.token);
  setUser({ id: data.user_id, email: data.email, display_name: data.display_name });
  return data;
};
```

**Concept: fetch API**
`fetch()` is the browser's built-in way to make HTTP requests. It returns a **Promise**.

- `method: "POST"` — We're sending data (not just requesting it)
- `headers: { "Content-Type": "application/json" }` — Tells the server "I'm sending JSON"
- `body: JSON.stringify(...)` — Converts JavaScript object to JSON string
- `res.ok` — `true` if status code is 200-299, `false` otherwise
- `res.json()` — Parses the response body as JSON

**Why async/await?**
`fetch()` is asynchronous — it takes time (network latency). `await` pauses the function until the response arrives, but WITHOUT blocking the entire browser.

```javascript
// These two are equivalent:
// Promise chain:
fetch(url).then(res => res.json()).then(data => console.log(data));

// Async/await (cleaner):
const res = await fetch(url);
const data = await res.json();
console.log(data);
```

#### The useAuth Hook

```jsx
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```

**Concept: Custom Hooks**
A custom hook is a function that starts with `use` and calls other hooks. This is a **facade pattern** — it hides the complexity of Context access behind a simple function call.

Any component can now do:
```jsx
const { user, token, login, logout } = useAuth();
```

---

### 6.5 AppRouter.jsx — Routing

```jsx
export default function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/app" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/app" /> : <SignupPage />} />
      <Route path="/app" element={user ? <App /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
```

**Concept: Protected Routes**

This implements two patterns:

1. **Route Guards** — `/app` redirects to `/login` if not authenticated
2. **Auto-redirect** — `/login` redirects to `/app` if already logged in

The logic is simple:
```
If user is logged in:
  / → redirect to /app
  /login → redirect to /app
  /signup → redirect to /app
  /app → show the debugger

If user is NOT logged in:
  / → show landing page
  /login → show login form
  /signup → show signup form
  /app → redirect to /login
```

**`<Navigate to="/app" />`** — React Router's way of redirecting. It replaces the current URL.

**`path="*"`** — Catches ALL unmatched URLs (404 handler). We redirect to `/` instead of showing a 404 page.

**Concept: Client-Side Routing vs Server-Side Routing**
- **Server-side** (traditional): Browser sends request to server → server returns HTML → full page reload
- **Client-side** (SPA): JavaScript changes the URL and swaps components — NO page reload, instant navigation

---

### 6.6 LandingPage.jsx — Public Homepage

This is a pure **presentational component** — it only displays static content with no state or API calls.

Key patterns:
- **Inline SVG** — The hero illustration is SVG code directly in JSX (no image files = faster loading, scalable to any size)
- **`<Link to="/signup">`** — React Router's replacement for `<a href>`. It navigates without page reload.
- **Component composition** — `HeroIllustration` is a separate component for organization

---

### 6.7 LoginPage.jsx & SignupPage.jsx — Auth Forms

```jsx
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();          // Prevent browser's default form submission
    setError(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/app");           // Go to debugger on success
    } catch (err) {
      setError(err.message);     // Show error message
    } finally {
      setLoading(false);
    }
  };
```

**Concept: Controlled Components**
```jsx
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

In React, form inputs are "controlled" — React owns the value, not the DOM. Every keystroke:
1. User types "a" → `onChange` fires → `setEmail("a")` → React re-renders → input shows "a"

This gives React full control over the form state.

**`e.preventDefault()`** — Without this, the browser would submit the form traditionally (full page reload with data in URL). We want to handle it with JavaScript instead.

**`useNavigate()`** — React Router hook that returns a function to programmatically change the URL.

---

### 6.8 App.jsx — Main Application (The Heart)

This is the biggest React file (1068 lines). It contains the entire debugging interface.

#### Key State Variables

```jsx
const [code, setCode] = useState("");              // User's input code
const [language, setLanguage] = useState("auto-detect");
const [result, setResult] = useState(null);        // Debug result from API
const [loading, setLoading] = useState(false);     // Is debugging in progress?
const [file, setFile] = useState(null);            // Uploaded file
const [usageCount, setUsageCount] = useState(0);   // How many debugs today
const [sidebarOpen, setSidebarOpen] = useState(true);
```

**Concept: useState**
`const [value, setValue] = useState(initialValue)` — Creates a piece of state.
- `value` — current value
- `setValue` — function to update it (triggers re-render)
- When you call `setValue(newValue)`, React schedules a re-render with the new value

#### The Debug Flow (Frontend Side)

```jsx
const handleDebug = useCallback(async () => {
  if (!code.trim() && !file) return;
  setLoading(true);
  setResult(null);

  // Check usage first
  const usageRes = await fetch(`${API_BASE}/api/check-usage`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ user_id: userId }),
  });
  const usage = await usageRes.json();
  if (usage.remaining <= 0) {
    setResult({ error: "Daily limit reached (50 debugs). Resets at midnight." });
    setLoading(false);
    return;
  }

  // Send code to debug
  const debugRes = await fetch(`${API_BASE}/api/debug`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ code, language }),
  });
  const data = await debugRes.json();

  // Save to history
  await fetch(`${API_BASE}/api/save-debug`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ user_id: userId, code, language, ...data }),
  });

  // Increment usage
  await fetch(`${API_BASE}/api/increment-usage`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ user_id: userId }),
  });

  setResult(data);
  setLoading(false);
}, [code, language, file, userId, token]);
```

**Concept: useCallback**
`useCallback(fn, deps)` — Memoizes the function. Without it, `handleDebug` would be recreated on every render (which could cause child components to re-render unnecessarily).

**The auth headers pattern:**
```jsx
const { user, token, logout } = useAuth();
const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};
```

Every API call includes the JWT token in the `Authorization` header. The backend verifies this token to identify the user.

#### Sub-components Inside App.jsx

**CopyButton** — Copies text to clipboard using `navigator.clipboard.writeText()`

**DiffCode** — Shows a side-by-side comparison of original and fixed code. It splits code by lines and highlights differences.

**SearchBar** — A CS knowledge search bar that sends queries to `/api/search` and displays structured results.

**FloatingChat** — A chat window (like ChatGPT) that sends messages to `/api/chat`. It maintains conversation history:
```jsx
const [messages, setMessages] = useState([]);
// Each message: { role: "user" | "assistant", content: "..." }
```

---

### 6.9 DebugHistory.jsx — Sidebar

```jsx
const DebugHistory = ({ userId, isOpen, onToggle, usageCount = 0 }) => {
  const { token, user, logout } = useAuth();
  const [debugs, setDebugs] = useState([]);
  const [loading, setLoading] = useState(false);
```

**Concept: Props**
`{ userId, isOpen, onToggle, usageCount }` — These are **props** (properties) passed from the parent component (App). They flow ONE-WAY: parent → child.

**Concept: useEffect with Dependencies**
```jsx
useEffect(() => {
  if (isOpen && token) fetchDebugHistory();
}, [isOpen, userId, token]);
```

This only fetches history when:
1. The sidebar is opened (`isOpen` changes to `true`)
2. The user ID changes
3. The token changes

**Relative Time Formatting:**
```jsx
const formatDate = (dateString) => {
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  // ...
};
```

This converts timestamps like "2024-01-15T14:30:00" to human-readable "5m ago", "2h ago", "Yesterday".

---

## 7. CSS ARCHITECTURE

### Design System

The app uses a consistent design system:

```css
/* Color Palette */
--primary: #399aff;        /* Blue — main brand color */
--text-primary: #1a2740;   /* Dark blue-gray — headings, body text */
--text-secondary: #3d5a80; /* Medium blue-gray — labels, secondary text */
--text-muted: #7a99c0;     /* Light blue-gray — timestamps, hints */
--bg: #ffffff;             /* Pure white background */
--border: #edf2f7;         /* Very light gray — card borders */
--accent: #e53e6e;         /* Pink — used sparingly for emphasis */

/* Typography */
font-family: 'Nunito', sans-serif;         /* Body text */
font-family: 'JetBrains Mono', monospace;  /* Code */
```

### Layout Pattern

```css
.app {
  display: flex;           /* Sidebar + main content side by side */
  height: 100vh;           /* Full viewport height */
}
.sidebar {
  width: 260px;            /* Fixed width */
  flex-shrink: 0;          /* Don't shrink when space is tight */
}
.app-main {
  flex: 1;                 /* Take all remaining space */
  overflow-y: auto;        /* Scroll if content overflows */
}
```

**Concept: Flexbox**
`display: flex` creates a flex container. Children are laid out in a row (default) or column.
- `flex: 1` — "grow to fill available space"
- `flex-shrink: 0` — "don't shrink when space is tight"
- This is the #1 CSS layout tool used in modern web development

### Responsive Design

```css
@media (max-width: 900px) {
  .landing-hero-inner {
    grid-template-columns: 1fr;  /* Stack vertically on small screens */
  }
}
```

**Concept: Media Queries**
CSS rules that only apply at certain screen sizes. This is how the app adapts from desktop to mobile.

---

## 8. HOW EVERYTHING CONNECTS — FULL REQUEST FLOW

Let's trace a complete signup → debug flow:

```
STEP 1: User opens http://localhost:5175
├── Browser loads index.html (from Vite dev server)
├── index.html has <div id="root"></div> and <script src="main.jsx">
├── main.jsx renders: BrowserRouter → AuthProvider → AppRouter
├── AuthProvider checks localStorage for auth_token → not found
├── loading = false, user = null
├── AppRouter sees user = null, path = "/"
└── Renders LandingPage

STEP 2: User clicks "Sign Up"
├── <Link to="/signup"> triggers client-side navigation
├── URL changes to /signup (no page reload!)
├── AppRouter sees user = null, path = "/signup"
└── Renders SignupPage

STEP 3: User fills form and clicks "Create Account"
├── handleSubmit(e) fires
├── e.preventDefault() stops browser form submission
├── Calls signup(email, password, displayName) from AuthContext
├── AuthContext sends POST to http://localhost:8000/api/auth/signup
│   ├── Request body: { email, password, display_name, anonymous_id }
│   ├── FastAPI receives request, validates with SignupRequest model
│   ├── Calls hash_password(password) → bcrypt generates hash
│   ├── Calls db.create_user(email, hash, name) → INSERT into SQLite
│   ├── Calls create_token(user_id, email) → JWT signed with secret
│   └── Returns { token, user_id, email, display_name }
├── AuthContext receives response
├── Stores token in localStorage
├── Sets user state → triggers re-render
├── navigate("/app") changes URL
├── AppRouter sees user != null, path = "/app"
└── Renders App (the debugger)

STEP 4: User pastes code and clicks "Debug"
├── handleDebug() fires
├── Sends POST /api/check-usage with Authorization: Bearer <token>
│   ├── Backend calls get_current_user → verifies JWT
│   ├── Calls db.check_usage(user_id) → SELECT from usage_tracking
│   └── Returns { count: 0, remaining: 50 }
├── Sends POST /api/debug with code and language
│   ├── Backend sanitizes code (curly quotes, control chars)
│   ├── Builds prompt for AI
│   ├── Sends to Groq API (LLaMA 3.3 70B)
│   ├── AI analyzes code, finds bugs, returns fixed version as JSON
│   ├── Backend parses JSON response
│   ├── Formats code (adds proper newlines)
│   └── Returns { original_code, debugged_code, errors_found, fixes_applied, explanation }
├── Sends POST /api/save-debug to store in history
├── Sends POST /api/increment-usage to update daily count
├── Sets result state → triggers re-render
└── App shows: original code, fixed code, errors list, explanation
```

---

## 9. SECURITY CONCEPTS

### Authentication vs Authorization

- **Authentication** — "Who are you?" (login, JWT verification)
- **Authorization** — "What can you do?" (we don't have role-based access yet, but could add admin/student/teacher roles)

### OWASP Top 10 Vulnerabilities We Protect Against

1. **SQL Injection** — Parameterized queries (`?` placeholders) prevent malicious SQL
2. **Broken Authentication** — bcrypt hashing, JWT with expiration, HTTPS in production
3. **Sensitive Data Exposure** — API keys in .env (not committed to Git), passwords hashed
4. **XSS (Cross-Site Scripting)** — React auto-escapes all text rendered in JSX
5. **CSRF** — Token-based auth (not cookies) is inherently CSRF-resistant

### What We'd Add for Production

- HTTPS (TLS certificates)
- Rate limiting on auth endpoints (prevent brute force)
- Input length limits on all fields
- CSRF tokens for cookie-based sessions
- Content Security Policy headers
- SQL query timeout

---

## 10. DATABASE DESIGN

```
┌─────────────────────┐     ┌──────────────────────┐
│     users            │     │   debug_history       │
├─────────────────────┤     ├──────────────────────┤
│ id (PK)             │────>│ id (PK)              │
│ email (UNIQUE)      │     │ user_id (FK→users.id)│
│ password_hash       │     │ code                  │
│ display_name        │     │ language              │
│ created_at          │     │ errors_found          │
│ last_login          │     │ fixes_applied         │
│ anonymous_id        │     │ explanation           │
└─────────────────────┘     │ created_at            │
                            └──────────────────────┘

┌─────────────────────┐     ┌──────────────────────┐
│  usage_tracking      │     │    assessments        │
├─────────────────────┤     ├──────────────────────┤
│ id (PK)             │     │ id (PK)              │
│ user_id             │     │ student_id            │
│ date                │     │ question_id           │
│ count               │     │ topic                 │
│ last_reset          │     │ is_correct            │
└─────────────────────┘     │ difficulty            │
                            │ time_spent            │
                            │ created_at            │
                            └──────────────────────┘
```

**Concept: Primary Key (PK)** — Unique identifier for each row. `AUTOINCREMENT` means the database assigns it automatically.

**Concept: Foreign Key (FK)** — Links one table to another. `debug_history.user_id` references `users.id`.

**Concept: Normalization** — Each piece of data is stored in exactly ONE place. User info is in `users`, not repeated in every `debug_history` row.

---

## 11. API DESIGN PATTERNS

### RESTful API Design

REST = Representational State Transfer. Our API follows REST conventions:

| Principle | How We Apply It |
|---|---|
| Use nouns, not verbs | `/api/debug-history` not `/api/getDebugHistory` |
| HTTP methods have meaning | POST = create/action, GET = read |
| Status codes | 200 = success, 400 = bad input, 401 = unauthorized, 500 = server error |
| JSON responses | All endpoints return JSON |
| Stateless | Each request includes its own auth token, server stores no session |

### Error Handling Pattern

```python
raise HTTPException(status_code=400, detail="Code cannot be empty")
```

FastAPI converts this to:
```json
HTTP 400
{ "detail": "Code cannot be empty" }
```

The frontend checks `if (!res.ok)` and displays the error message.

---

## 12. CONCEPTS YOU MUST KNOW FOR INTERVIEWS

### Computer Science Concepts in This Code

| Concept | Where It Appears |
|---|---|
| **Client-Server Architecture** | React (client) ↔ FastAPI (server) |
| **REST API** | All `/api/*` endpoints |
| **Authentication & Authorization** | JWT, bcrypt, protected routes |
| **State Management** | React Context, useState, useEffect |
| **Asynchronous Programming** | async/await in both Python and JavaScript |
| **Database Design** | SQLite schema, normalization, SQL queries |
| **Hashing** | bcrypt password hashing |
| **Cryptographic Signing** | JWT with HMAC-SHA256 |
| **Component Architecture** | React components, props, composition |
| **Middleware** | CORS middleware, auth dependency injection |
| **Prompt Engineering** | Building structured prompts for LLMs |
| **Rate Limiting** | 50 debugs/day usage tracking |
| **File Handling** | PDF parsing, multi-format file upload |
| **Error Handling** | try/catch/finally, HTTP status codes |
| **Responsive Design** | CSS media queries, flexbox, grid |
| **Environment Configuration** | .env files, 12-factor app principles |
| **Defensive Programming** | Input sanitization, fallback parsing |
| **Machine Learning** | IRT, BKT, adaptive difficulty |
| **Sigmoid Function** | Used in IRT probability calculation |
| **Hidden Markov Model** | BKT is an HMM for knowledge state tracking |
| **Bayesian Inference** | BKT updates beliefs based on evidence |

### Design Patterns Used

| Pattern | Where |
|---|---|
| **Repository Pattern** | `database.py` — all DB access through one class |
| **Singleton Pattern** | `db = DebuggerDatabase()` — one global instance |
| **Provider Pattern** | `AuthProvider` wraps the entire React tree |
| **Facade Pattern** | `useAuth()` simplifies Context access |
| **Observer Pattern** | React's state → re-render when state changes |
| **Dependency Injection** | `Depends(get_current_user)` in FastAPI |
| **Strategy Pattern** | Different ML models for different analyses |
| **Builder Pattern** | `build_debug_prompt()` constructs complex prompts |
| **Middleware Pattern** | CORS middleware processes every request |

---

## 13. SYSTEM ARCHITECTURE DIAGRAM

```
┌──────────────────────────────────────────────────────┐
│                    USER (Browser)                     │
│                                                      │
│  Types code → Clicks Debug → Sees results            │
└──────────────────────┬───────────────────────────────┘
                       │ HTTP/HTTPS
                       │ Authorization: Bearer <JWT>
                       ▼
┌──────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite)                  │
│              Port 5175                                │
│                                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐  │
│  │ Landing │ │ Auth    │ │ Debug   │ │ Sidebar  │  │
│  │ Page    │ │ Pages   │ │ View    │ │ History  │  │
│  └─────────┘ └─────────┘ └─────────┘ └──────────┘  │
│        │          │            │            │        │
│  ┌─────┴──────────┴────────────┴────────────┴────┐  │
│  │    AuthContext (user, token, login, logout)     │  │
│  └────────────────────────────────────────────────┘  │
│        │                                             │
│  ┌─────┴────────────────┐                            │
│  │ AppRouter (Routes)   │                            │
│  │ / → Landing          │                            │
│  │ /login → LoginPage   │                            │
│  │ /signup → SignupPage │                            │
│  │ /app → App (auth!)   │                            │
│  └──────────────────────┘                            │
└──────────────────────┬───────────────────────────────┘
                       │ fetch() API calls
                       ▼
┌──────────────────────────────────────────────────────┐
│              BACKEND (FastAPI + Uvicorn)              │
│              Port 8000                                │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │            CORS Middleware                      │  │
│  └────────────────────────────────────────────────┘  │
│                       │                              │
│  ┌────────────────────┼──────────────────────────┐  │
│  │                    │                          │  │
│  ▼                    ▼                          ▼  │
│  AUTH              AI ENDPOINTS            DATA     │
│  ┌──────────┐     ┌──────────┐        ┌──────────┐ │
│  │ /signup  │     │ /debug   │        │/save-    │ │
│  │ /login   │     │ /chat    │        │ debug    │ │
│  │ /me      │     │ /search  │        │/debug-   │ │
│  │          │     │ /upload  │        │ history  │ │
│  │ bcrypt   │     │ /run     │        │/check-   │ │
│  │ PyJWT    │     │ /explain │        │ usage    │ │
│  └──────────┘     └────┬─────┘        └────┬─────┘ │
│                        │                   │       │
│                        ▼                   ▼       │
│                  ┌──────────┐       ┌──────────┐   │
│                  │ Groq API │       │ SQLite   │   │
│                  │ (Cloud)  │       │ (Local)  │   │
│                  │ LLaMA    │       │debugger  │   │
│                  │ 3.3 70B  │       │.db file  │   │
│                  └──────────┘       └──────────┘   │
│                                                     │
│  SUPPORT MODULES:                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │nlp_engine│  │ml_models │  │adaptive_         │  │
│  │.py       │  │.py       │  │integration.py    │  │
│  │          │  │IRT, BKT  │  │                  │  │
│  │NLP tasks │  │Difficulty │  │Connects ML to   │  │
│  │via Groq  │  │Recommender│  │API endpoints    │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 14. WHAT GOOGLE INTERVIEWERS WILL ASK ABOUT THIS PROJECT

### System Design Questions

**Q: "How would you scale this to 1 million users?"**
A: 
1. Replace SQLite with PostgreSQL (handles concurrent writes)
2. Add Redis for caching (session data, rate limits, frequent queries)
3. Run multiple backend instances behind a load balancer (Nginx/ALB)
4. Use a message queue (RabbitMQ/SQS) for async code execution
5. Move code execution to Docker containers on Kubernetes
6. Add CDN for static frontend files (CloudFront/Cloudflare)
7. Horizontal scaling — JWT is already stateless, so any server can verify tokens

**Q: "Why SQLite instead of PostgreSQL?"**
A: This is a single-server prototype for school deployment. SQLite handles millions of rows, needs zero config, and has no operational overhead. We'd switch to PostgreSQL when we need concurrent writers from multiple server instances.

**Q: "How do you prevent the code execution endpoint from being exploited?"**
A: Currently we use subprocess with a 15-second timeout. For production:
1. Run code in isolated Docker containers with no network access
2. Limit CPU and memory with cgroups
3. Use seccomp to block dangerous syscalls (no file access, no network)
4. Destroy the container after each execution
5. This is exactly how LeetCode, HackerRank, and Google's Code Jam work

**Q: "What happens if the Groq API goes down?"**
A: Right now, the user sees an error. For production:
1. Add a **circuit breaker** — after 5 consecutive failures, stop calling Groq for 30 seconds
2. Add a **fallback provider** — switch to OpenAI or Anthropic if Groq fails
3. Queue failed requests and retry with **exponential backoff**
4. Show cached results if the same code was debugged before

### Coding Questions

**Q: "Explain your JWT implementation. What are the security risks?"**
A:
- Risk: If JWT_SECRET is leaked, anyone can forge tokens → solution: rotate secrets regularly, use RS256 with key pairs
- Risk: Token doesn't expire soon enough → solution: short-lived access tokens (15 min) + refresh tokens (7 days)
- Risk: Token can't be revoked → solution: maintain a blacklist in Redis, check on every request
- Risk: Token in localStorage is vulnerable to XSS → solution: use httpOnly cookies instead

**Q: "Why did you use Context API instead of Redux?"**
A: Our global state is just `{ user, token }` — it changes only on login/logout. Context API is perfect for low-frequency updates. Redux adds ~15KB to the bundle and requires boilerplate (actions, reducers, selectors) that isn't justified here. If we added 10+ pieces of global state with frequent updates (like real-time collaboration), we'd switch to Zustand or Redux Toolkit.

**Q: "Walk me through what happens when a user's JWT expires."**
A:
1. User makes any API call
2. Backend's `decode_token()` raises `jwt.ExpiredSignatureError`
3. Backend returns 401 status
4. Frontend's `fetch` gets `res.ok = false`
5. `AuthContext` catches the error, clears localStorage, sets user to null
6. `AppRouter` sees user is null, redirects to `/login`
7. User logs in again, gets a new token

### Behavioral Questions

**Q: "Tell me about a technical decision you had to make in this project."**
A: "We chose to use the OpenAI SDK to talk to Groq's API instead of Groq's own SDK. Groq designed their API to be OpenAI-compatible, so using the OpenAI SDK gives us provider portability — if we want to switch to OpenAI, Anthropic, or any other compatible provider, we just change the base_url and API key. No code changes needed. This is the **adapter pattern** in practice."

**Q: "How would you test this application?"**
A:
1. **Unit tests** — Test `hash_password`, `create_token`, `parse_response` in isolation
2. **Integration tests** — Test API endpoints with a test database
3. **E2E tests** — Cypress/Playwright to test the full signup → debug → history flow
4. **Load tests** — k6/Locust to verify the server handles concurrent users
5. **Security tests** — OWASP ZAP scan for common vulnerabilities

---

## FINAL SUMMARY

CodeFix is a **full-stack web application** using:
- **React** for the UI (component-based, SPA)
- **FastAPI** for the backend (async, type-safe, auto-docs)
- **SQLite** for storage (lightweight, zero-config)
- **Groq/LLaMA** for AI (fast inference, OpenAI-compatible)
- **bcrypt + JWT** for auth (industry-standard security)

The architecture follows the **3-tier pattern** (presentation → application → data), uses **RESTful API design**, implements **stateless authentication** with JWT, and includes **ML models** for adaptive learning.

Every technology choice was made for a specific reason, and every alternative was considered. This is exactly the kind of thinking Google looks for in interviews — not just "I used React" but "I used React because of X, considered Y as an alternative, and would switch to Z if the requirements changed."

---

*Built by CodeVidhya — Coding Education for Everyone*
*Document version: 1.0 | Last updated: May 2026*
