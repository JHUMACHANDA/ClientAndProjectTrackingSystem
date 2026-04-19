import axios from "axios";

const API = "http://localhost:5001/api/clients";

const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

const clientService = {
    getClients:   async () => (await axios.get(API, getAuthHeader())).data,
    createClient: async (data) => (await axios.post(API, data, getAuthHeader())).data,
    updateClient: async (id, data) => (await axios.put(`${API}/${id}`, data, getAuthHeader())).data,
    deleteClient: async (id) => (await axios.delete(`${API}/${id}`, getAuthHeader())).data,
};

export default clientService;