import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Celebration, Done } from '@mui/icons-material';
import { GreetingMessagePostModel } from '../../../types-change/GreetingMessageType';

const BlessingPreview = ({ blessing, onSave }: { blessing: GreetingMessagePostModel; onSave: () => void }) => (
  <Card sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9' }}>
    <CardContent>
      <Celebration color="secondary" fontSize="large" />
      <Typography variant="h6" gutterBottom>{blessing.title}</Typography>
      <Typography sx={{ my: 2 }}>{blessing.content}</Typography>
      <Typography variant="subtitle2" align="right">{blessing.signature}</Typography>
    </CardContent>
    <Box display="flex" justifyContent="center" gap={2}>
      <IconButton onClick={onSave} title="שמור ברכה">
        <Done />
      </IconButton>
    </Box>
  </Card>
);

export default BlessingPreview;
