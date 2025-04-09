import { IconButton, Box } from '@mui/material';
import { Send, Refresh, Close } from '@mui/icons-material';

const ActionButtons = ({
  onGenerate,
  onClose,
  disabled,
}: {
  onGenerate: () => void;
  onClose: () => void;
  disabled: boolean;
}) => (
  <Box display="flex" justifyContent="center" gap={2} mt={1}>
    <IconButton onClick={onGenerate} disabled={disabled} title="צור ברכה">
      <Send />
    </IconButton>
    <IconButton onClick={onGenerate} disabled={disabled} title="נסה ברכה אחרת">
      <Refresh />
    </IconButton>
    <IconButton onClick={onClose} title="סגור">
      <Close />
    </IconButton>
  </Box>
);

export default ActionButtons;
