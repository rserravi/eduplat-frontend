import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

const AlertSnackbar = ({ severity, message, open, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {t(message)}
      </Alert>
    </Snackbar>
  );
};

AlertSnackbar.propTypes = {
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AlertSnackbar;
