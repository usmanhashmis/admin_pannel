// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, TextField, Button } from '@mui/material';
import { useState } from 'react';

import axios from 'axios';

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  const {reply, setReply} = useState([]);
  const replymesg = () => {
    axios
    .get('http://localhost:420/msg/query',{reply})
    .then((res) => {
      console.log("done",res);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
              <Typography variant="h8">{site.msg}</Typography>
              
              <TextField
                id="outlined-basic"
                label="Reply"
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
                placeholder="Write reply "
              />
              <Button variant="h4" onClick={replymesg}>{site.reply}</Button>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
