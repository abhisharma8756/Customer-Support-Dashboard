import { create } from "zustand";
import { fetchTickets, updateTicketStatus } from "../services/ticketApi";
const useTicketStore = create((set) => ({
  tickets: [],
  loading: false,
  error: null,
  search: "",
  statusFilter: "All",
  priorityFilter: "All",
  selectedTicket: null,
  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      set({ tickets: await fetchTickets(), loading: false });
    } catch {
      set({ error: "Unable to load tickets.", loading: false });
    }
  },
  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  selectTicket: (selectedTicket) => set({ selectedTicket }),
  closeTicket: () => set({ selectedTicket: null }),
  changeStatus: async (id, status) => {
    try {
      const updated = await updateTicketStatus(id, status);
      set((s) => ({
        tickets: s.tickets.map((t) => (t.id === id ? updated : t)),
        selectedTicket:
          s.selectedTicket?.id === id ? updated : s.selectedTicket,
      }));
    } catch {
      set({ error: "Unable to update ticket status." });
    }
  },
}));
export default useTicketStore;
