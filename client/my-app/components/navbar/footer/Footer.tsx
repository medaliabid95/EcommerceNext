import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import "./footer.css"
const Footer: React.FC = () => {
  return (
    <Box
    className='ftr'
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Your Website. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
