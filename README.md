Coding Agent Sandbox

A basic coding agent with sandboxing, orchestration, and context management. Built for evaluation of architecture, reliability, and scalability.


Features

- POST /schedule – Accepts plain text tasks 
- GET /status/:id – Check task status and get results
- Job folders created with task + output
- Sandboxed environment with Replit 
- Context handled with per-task folders

Folder Structure

coding-agent-sandbox/
├── orchestrator/
│   ├── server.js          # Main API server
│   └── jobs/              # Auto-created job folders (per request)
│       └── job-<id>/
│           ├── task.txt
│           └── log.txt
├── Dockerfile             # Optional: Docker setup
├── README.md              # This file


 How to Run (on Replit)

1. Upload code to Replit
2. Set `.replit` to:
   run = "node orchestrator/server.js"
3. Click Run
4. Open web preview – You'll see:
   👋 Welcome to the Coding Agent API


How to Test

1. In Replit Shell:
   curl -X POST http://localhost:3000/schedule -H "Content-Type: application/json" -d "{\"task\":\"Build a Flask app\"}"

2. You'll receive a response:
   {"id": "1751189201156"}

3. Check status:
   curl http://localhost:3000/status/1751189201156

4. Output is saved in:
   orchestrator/jobs/job-1751189201156/


 Future Extensions (Optional)

- Integrate with OpenAI API to generate real code
- Use Firecracker or Docker for isolated execution
- Add UI form to submit tasks via browser



Requirements Met

-  Orchestration Layer
-  Shell-level sandboxing (mocked)
-  Filesystem-based context management
-  No dependencies required locally
-  Extensible structure



 Author

Vikas H J – hjvikas5@gmail.com
