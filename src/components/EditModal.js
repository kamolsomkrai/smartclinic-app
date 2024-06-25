// src/components/EditModal.js
import React from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const EditModal = ({ isModalOpen, handleClose, selectedPerson }) => (
  <Modal
    open={isModalOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    className="flex items-center justify-center"
  >
    <Box className="bg-white p-8 rounded-lg shadow-lg w-96">
      <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4">
        Edit Person
      </Typography>
      {selectedPerson && (
        <form>
          <TextField
            label="First Name"
            value={selectedPerson.firstName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={selectedPerson.lastName}
            fullWidth
            margin="normal"
          />
          {/* Add more fields as necessary */}
          <Box className="mt-4 flex justify-end space-x-2">
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Box>
  </Modal>
);

export default EditModal;
