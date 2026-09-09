import axios from "axios";
const API_URL = "http://localhost:3001/tickets";
export const fetchTickets = async () => (await axios.get(API_URL)).data;
export const updateTicketStatus = async (id, status) =>
  (await axios.patch(`${API_URL}/${id}`, { status })).data;
