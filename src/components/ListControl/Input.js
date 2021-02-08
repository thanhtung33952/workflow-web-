import React from 'react';
// material
import TextField from '@material-ui/core/TextField';

export default function Control() {
  return (
    <TextField
      defaultValue="placeholder..."
      variant="outlined"
      disabled={true}
    />
  );
}
