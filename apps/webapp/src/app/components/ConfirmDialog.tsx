import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Cancel from '@mui/icons-material/Cancel';

interface Props {
	open: boolean;
	content: React.ReactNode;
	onClose: () => void;
	confirmAction: () => void | Promise<void>;
}

// The cancel and confirm action icon, they could be customed later if it can be reused.
const ConfirmDialog: React.FC<Props> = ({ open, onClose, content, confirmAction }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirm Delete</DialogTitle>
			<DialogContent>
				{content}
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} startIcon={<Cancel />} variant="outlined">
					Cancel
				</Button>
				<Button onClick={confirmAction} startIcon={<DeleteIcon />} variant="contained">
					Confirm
				</Button>
			</DialogActions>
		</Dialog >
	);
};

export default ConfirmDialog;