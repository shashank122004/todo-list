# Kept — MERN Notes/Todo App

## Stack
Node.js + Express + MongoDB (backend) · React + Vite (frontend)

## Run locally
```bash
# 1. Backend
cd server
cp .env.example .env   # set MONGO_URI to your MongoDB Atlas connection string
npm install
npm run dev             # http://localhost:5000

# 2. Frontend
cd ../client
npm install
npm run dev              # http://localhost:5173
```

The server requires `MONGO_URI` and does not use a local MongoDB fallback. In
MongoDB Atlas, create a database user, allow your development IP in Network
Access, and copy the driver connection string into `server/.env`. URL-encode
special characters in the username or password.

## DevOps next steps (for your learning)
1. Dockerize: separate `Dockerfile` for server (node:alpine) and client (multi-stage build → nginx).
2. `docker-compose.yml` with 3 services: mongo, server, client.
3. GitHub Actions: lint/build on PR, build+push images to Docker Hub/ECR on merge to main.
4. Deploy: EC2 with docker-compose, or ECS/EKS for orchestration practice.
5. Add health checks (`/api/health` already included) for load balancer/K8s probes.


