# Facebook Comment & Live Order Confirmation System (CF System)

This is a full-stack real-time order confirmation system connected to Facebook Pages. 
When a customer comments "CF", "Order" or "เอา" during a Facebook live stream, the system automatically parses the comment via BullMQ, extracts the quantity, and creates an order that immediately appears on the Dashboard via Socket.io.

## Features
- **Frontend**: React (Vite) + TailwindCSS + Zustand + Socket.io-Client + i18next (Thai/Lao)
- **Backend**: Node.js + Express + MongoDB + Redis (BullMQ) + Socket.io
- **Real-time**: Live comment feed and order updates.
- **Multilingual**: Toggle between Thai (TH) and Lao (LO).

---

## 🚀 How to Run Locally

### 1. Prerequisites
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) installed.
- [Node.js](https://nodejs.org/en/) installed (v18+ recommended).

### 2. Start Database & Message Queue
We use Docker to quickly spin up MongoDB and Redis.
```bash
# In the root project folder (d:/coding/cf-noy)
docker-compose up -d
```
This runs MongoDB on port `27017` and Redis on `6379`.

### 3. Start the Backend API
Open a new terminal and run:
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`. It will automatically connect to MongoDB and Redis.

### 4. Start the Frontend
Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Testing the Mock System
Since Facebook requires an approved app to send real webhooks:
1. Click **"Mock (CF)"** button on the Dashboard navbar.
2. This sends a mock payload to the backend.
3. Observe the left order table and right live-comments feed update instantly!

## 🔧 Real Facebook Webhook Integration
1. Set up a Webhook in the Meta App Dashboard pointing to `https://your-domain.com/api/webhook/facebook`.
2. Provide your `FB_VERIFY_TOKEN` (defined in `backend/.env`) when setting up.
3. In `backend/src/routes/webhookRoutes.js`, you can modify the logic to capture real page messages.
