import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axiosClient';
import { logout } from '../store/authSlice';

export const DashboardPage: React.FC = () => {
  const [message, setMessage] = useState<string>('Connecting to API...');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/admin/dashboard')
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage('Failed to connect with protected admin endpoint.'));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>PPC Campaign Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
      </Box>

      {/* Grid replacement using Flex/CSS Grid for MUI v6 compatibility */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd' }}>
          <Typography variant="h6">Total Clicks</Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>1,420</Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#e8f5e9' }}>
          <Typography variant="h6">Impressions</Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>28.5K</Typography>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fff3e0' }}>
          <Typography variant="h6">Total Spend</Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>$1,240.50</Typography>
        </Paper>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Protected Backend Connection Status</Typography>
          <Typography variant="body1" color="success.main">{message}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};