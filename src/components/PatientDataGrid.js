import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Tooltip, IconButton, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomAvatar from './CustomAvatar';
import { getInitials } from '../utils/get-initials';

const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6);
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary'];
  const color = states[stateNum];
  if (row.avatar && row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />;
  } else {
    return (
      <CustomAvatar skin="light" color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    );
  }
};

const PatientDataGrid = ({ data, handleEdit, handleDelete }) => {
  return (
    <Box className="bg-white rounded-lg shadow p-6">
      {/* <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="text-gray-800">Quick Filter</Typography>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Filters</button>
      </Box> */}
      <Box className="overflow-x-auto">
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Name</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>HN</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Sex</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Birthdate</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Occupation</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ borderBottom: '1px solid #e0e0e0' }}>
                    No rows
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Box className="flex items-center">
                        {renderClient(row)}
                        <Box className="flex flex-col">
                          <Typography noWrap variant='body2' className="text-gray-900 font-semibold">
                            {row.prefixName} {row.firstName} {row.middleName} {row.lastName}
                          </Typography>
                          <Typography noWrap variant='caption' className="text-gray-600">
                            {row.cid}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{row.hn}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{row.sex}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{row.birthDate}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{row.occupation}</TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Box className="space-x-2">
                        <Tooltip title="Edit">
                          <IconButton color='primary' aria-label='edit' onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color='secondary' aria-label='delete' onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="flex justify-between items-center mt-4">
        <div className="text-sm">
          Rows per page:
          <Select defaultValue={7} className="ml-1" size="small">
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </div>
        <div className="text-sm">0-0 of 0</div>
        <div className="space-x-2">
          <button className="border border-gray-300 rounded px-3 py-1">{'<'}</button>
          <button className="border border-gray-300 rounded px-3 py-1">{'>'}</button>
        </div>
      </Box>
    </Box>
  );
};

export default PatientDataGrid;
