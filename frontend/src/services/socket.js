import { io } from 'socket.io-client';

// In production, you would point to your domain. For local dev, 5000 is our backend port
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  autoConnect: false // We will connect manually when the app starts
});

export default socket;
