# StudyTube — Learn Smarter from Any YouTube Video

StudyTube is a full-stack AI-powered web application that transforms any YouTube video into an interactive knowledge base. Paste a video link, ask questions in natural language, and get precise, context-aware answers — all powered by a production-grade RAG architecture. Built for students, researchers, and professionals who want to extract insights from video content without watching hours of footage.

**Live Demo:** [studyytube-frontend.vercel.app](https://studyytube-frontend.vercel.app)

---

## Problem Statement & Solution Approach

Watching long YouTube videos to extract specific information is time-consuming and inefficient. There is no native way to query video content — users are forced to scrub, pause, and rewatch manually.

StudyTube solves this by extracting the full transcript of any YouTube video and building a real-time, searchable knowledge base on top of it. Users ask natural language questions and receive precise, grounded answers — instantly.

**What makes it effective:**
- On-demand, session-based processing with no persistent storage layer
- Timestamp-aware transcript extraction preserves temporal context
- Diverse, non-repetitive answers
- Entirely free to operate — built on open-source and free-tier infrastructure

---

## User Flow

1. User visits the StudyTube web app
2. Pastes a YouTube video URL into the input field
3. Clicks **"Start Studying"**
4. App navigates to a split-screen — video playing on the left, chat interface on the right
5. User types a question in the chat input
6. RAG architecture retrieves the most relevant transcript chunks and generates a precise answer
7. Answer appears in the chat — user can continue asking follow-up questions
8. User clicks **"New Video"** to start a fresh session with a different video

---

## Tech Stack & Architecture

### Frontend
- **React** — component-based UI with hooks and memo optimization
- **Vite** — fast bundler and development server
- **Tailwind CSS** — utility-first styling
- **React Router DOM** — URL-based client-side navigation

### Backend
- **Python + FastAPI** — high-performance async REST API
- **LangChain** — RAG pipeline orchestration
- **FAISS** — in-memory vector store for similarity search
- **youtube-transcript-api** — transcript extraction
- **Groq API (LLaMA 3)** — fast, free LLM for response generation
- **HuggingFace Inference API (BAAI/bge-small-en-v1.5)** — cloud-based embedding model

---

### AI & RAG Architecture

**What is RAG?**
Retrieval-Augmented Generation (RAG) is an AI pattern that retrieves relevant context from a knowledge base before generating a response. Instead of relying solely on pre-trained knowledge, the LLM answers are grounded in the actual source content — making responses accurate, specific, and hallucination-resistant.

**How RAG is implemented in StudyTube:**

<img width="1600" height="877" alt="image" src="https://github.com/user-attachments/assets/0a0056fb-cf5f-4681-bfe3-d61041600e09" />


| Step | Implementation |
|------|---------------|
| **Transcript Extraction** | Fetched via `youtube-transcript-api`; each line formatted as `[MM:SS] text` to preserve temporal context |
| **Chunking** | `RecursiveCharacterTextSplitter` with `chunk_size=1000` and `chunk_overlap=200` to preserve semantic continuity |
| **Embeddings** | Each chunk converted to a 384-dimensional vector via HuggingFace Inference API |
| **Vector Database** | FAISS in-memory store — fast session-based retrieval with zero persistence overhead |
| **Retriever** | MMR (Maximum Marginal Relevance) search — returns top 3 relevant and diverse chunks |
| **LLM Generation** | Retrieved chunks + user question → structured prompt → Groq LLaMA 3 → grounded answer |

---

### System Architecture Overview

The system follows a **scalable, modular, layered architecture** with strict separation of concerns:

```
Frontend (React / Vercel)
          ↓ REST API (HTTPS)
Backend (FastAPI / Render)
    ├── routes/        → HTTP endpoint definitions
    ├── services/      → core business logic
    │   ├── transcript.py
    │   ├── embeddings.py
    │   ├── retriever.py
    │   └── generator.py
    ├── models/        → Pydantic request/response schemas
    └── utils/         → shared helper functions
```

Each layer has a single, well-defined responsibility — making the system easy to extend, test, and maintain independently.


> <img width="2597" height="784" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/52e05a0c-96ac-400f-8194-6bae425a7115" />


---

## Industry-Grade Best Practices Followed

- **Modular architecture** — backend organized into `routes/`, `services/`, `models/`, and `utils/` with strict single-responsibility boundaries
- **Environment-based configuration** — all secrets managed via `.env` files; never hardcoded or committed to version control
- **Pydantic request validation** — all API inputs validated at the schema level before processing begins
- **Structured error handling** — `try/except/finally` at both service and route layers; HTTP exceptions returned with meaningful status codes
- **Secure CORS configuration** — allowed origins controlled via environment variables; not left open with wildcards in production
- **React performance optimization** — `React.memo` on `ChatMessage` prevents unnecessary re-renders on every new message
- **Dependency locking** — `requirements.txt` generated via `pip freeze` to ensure reproducible builds across environments
- **Git hygiene** — `.gitignore` configured to exclude `venv/`, `.env`, `__pycache__/`, and `node_modules/`
- **Functional state updates** — used `setMessages(prev => [...prev, msg])` pattern to avoid stale closure bugs in async callbacks

---

## Challenges Faced & Solutions

| Challenge | Solution |
|-----------|----------|
| **Memory constraints on free-tier deployment (512MB)** | Switched from local HuggingFace model to Inference API — eliminated PyTorch/torch overhead entirely |
| **Preventing LLM hallucinations** | Enforced strict prompt constraints so the model only answers from retrieved context, not pre-trained knowledge |
| **Maintaining response relevance across long transcripts** |Tried out different startegies and implemented semantic chunking with overlap (`chunk_overlap=100`) to preserve context continuity at chunk boundaries |
| **Cold start latency on free-tier servers** | Documented expected behavior; designed frontend error handling to surface meaningful messages during server wake-up |
| **Stale React state in async callbacks** | Replaced direct state references with functional updater pattern (`prev => [...prev, newItem]`) to guarantee latest state |
| **CORS blocking cross-origin requests** | Added `CORSMiddleware` to FastAPI with environment-variable-controlled allowed origins |
| **YouTube Transcript API breaking changes** | Adapted to new instance-based API and object dot-notation access after a version upgrade changed the interface |

---

## Future Scope

- **Persistent vector store** — replace in-memory FAISS with ChromaDB or Pinecone for multi-session video caching and faster repeat queries
- **Timestamp-linked answers** — parse timestamps from retrieved chunks and render clickable links that jump to the exact moment in the video
- **Multi-video support** — allow users to query across multiple videos simultaneously for comparative research
- **Docker + CI/CD pipeline** — containerize the full stack with Docker Compose; automate testing and deployment via GitHub Actions
- **User authentication & history** — add login functionality to persist chat history and previously processed videos per user
- **Mobile-responsive UI** — optimize the split-screen interface for mobile and tablet viewports

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/Atharv-17/StudyYTube-RAG.git
cd StudyYTube-RAG

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt

# Create backend/.env and add:
# GROQ_API_KEY=your_groq_api_key
# HF_TOKEN=your_huggingface_token

# Run backend
uvicorn main:app --reload

# Frontend setup (open a new terminal)
cd frontend
npm install

# Create frontend/.env and add:
# VITE_API_URL=http://localhost:8000

npm run dev
```

---

## Deployment

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Vercel | [studyytube-frontend.vercel.app](https://studyytube-frontend.vercel.app) |
| Backend | Render | [studyytube-rag-backend.onrender.com](https://studyytube-rag-backend.onrender.com) |

> **Note:** The backend runs on Render's free tier and may take 30–60 seconds to respond after inactivity. This is expected behavior.

---

## Author

Built by **Me :)** — from zero to production, end-to-end.

> _"Build the brain first. Worry about the face later."_

⭐ If this project helped you learn something — drop a star. It means a lot.
