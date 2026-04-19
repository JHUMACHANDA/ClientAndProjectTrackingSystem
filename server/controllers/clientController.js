import Client from "../Models/Client.js";


export const createClient = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    
    const newClient = new Client({
      name,
      email,
      user: req.user._id 
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: "Error saving client", error: error.message });
  }
};


export const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ user: req.user._id });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        
        const updatedClient = await Client.findOneAndUpdate(
            { _id: id, user: req.user.id }, 
            { name, email }, 
            { new: true }
        );
        
        if (!updatedClient) return res.status(404).json({ message: "Client not found or unauthorized" });
        
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await Client.findOneAndDelete({ _id: id, user: req.user.id });
        
        if (!deletedClient) return res.status(404).json({ message: "Client not found or unauthorized" });
        
        res.json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};