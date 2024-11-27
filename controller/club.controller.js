const Club = require('../model/club.model.js')

// Create a new club  
exports.createClub = async (req, res) => {  
  try {  
    const club = new Club(req.body);  
    await club.save();  
    res.status(201).json({ message: 'Club created successfully', club });  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating club', error: error.message });  
  }  
};  

// Get all clubs  
exports.getAllClubs = async (req, res) => {  
  try {  
    const clubs = await Club.find();  
    res.status(200).json(clubs);  
  } catch (error) {  
    res.status(500).json({ message: 'Error retrieving clubs', error: error.message });  
  }  
};  

// Get a single club by ID  
exports.getClubById = async (req, res) => {  
  const { id } = req.params;  
  try {  
    const club = await Club.findById(id);  
    if (!club) {  
      return res.status(404).json({ message: 'Club not found' });  
    }  
    res.status(200).json(club);  
  } catch (error) {  
    res.status(500).json({ message: 'Error retrieving club', error: error.message });  
  }  
};  

// Update a club by ID  
exports.updateClub = async (req, res) => {  
  const { id } = req.params;  
  try {  
    const club = await Club.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });  
    if (!club) {  
      return res.status(404).json({ message: 'Club not found' });  
    }  
    res.status(200).json({ message: 'Club updated successfully', club });  
  } catch (error) {  
    res.status(400).json({ message: 'Error updating club', error: error.message });  
  }  
};  

// Delete a club by ID  
exports.deleteClub = async (req, res) => {  
  const { id } = req.params;  
  try {  
    const club = await Club.findByIdAndDelete(id);  
    if (!club) {  
      return res.status(404).json({ message: 'Club not found' });  
    }  
    res.status(200).json({ message: 'Club deleted successfully' });  
  } catch (error) {  
    res.status(500).json({ message: 'Error deleting club', error: error.message });  
  }  
};
