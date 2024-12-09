import axios from 'axios';

const api = axios.create({
  baseURL: 'https://slack-api.replit.app/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

let authHeaders = {}; // This stores the current authentication headers

// Set authentication headers
export const setAuthHeaders = (headers) => {
  authHeaders = {
    'access-token': headers['access-token'],
    client: headers['client'],
    expiry: headers['expiry'],
    uid: headers['uid'],
  };
};

// Clear authentication headers
export const logout = () => {
  authHeaders = {};
  localStorage.removeItem("authHeaders");
};

// User Registration
export const register = (email, password) => {
  return api.post('/auth', {
    email,
    password,
    password_confirmation: password,
  });
};

// Login
export const login = (email, password) => {
  return api.post('/auth/sign_in', { email, password });
};

// Create Channel
export const createChannel = (channelName, userIds = []) => {
  return api.post(
    '/channels',
    { name: channelName, user_ids: userIds },
    { headers: authHeaders }
  );
};

export const addUserToChannel = (channelId, userId) => {
  return api.post(
      `/channel/add_member`, 
      { id: channelId, member_id: userId },
      { headers: authHeaders }
  );
};

// Send Message
export const sendMessage = (receiverId, receiverType, body) => {
  return api.post(
    '/messages',
    { receiver_id: receiverId, receiver_class: receiverType, body },
    { headers: authHeaders }
  );
};

// Retrieve Messages
export const getMessages = (receiverId, receiverType) => {
  return api.get(
    `/messages?receiver_id=${receiverId}&receiver_class=${receiverType}`,
    { headers: authHeaders }
  );
};

// Get All Users
export const getAllUsers = () => {
  return api.get('/users', { headers: authHeaders });
};

// Get All Channels
export const getAllChannels = () => {
  return api.get('/channels', { headers: authHeaders });
};

// Get Channel Details by ID
export const getChannelDetails = (channelId) => {
  return api.get(`/channels/${channelId}`, { headers: authHeaders });
};
