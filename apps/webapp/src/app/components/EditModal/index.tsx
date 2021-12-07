import React from 'react'
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl'
import { Button, FormGroup, Input, InputLabel, Typography } from '@material-ui/core'
import style from './EditModal.module.css'
import { Cancel, Save } from '@mui/icons-material'
import { Referral } from '../../types/referral'
import { createReferral, updateReferral } from '../../api/referral'

interface Props {
	open: boolean;
	onClose: () => void;
	editReferral: Referral | null;
	referrals: Referral[];
	updateReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
}

const EditModal = ({ open, onClose, editReferral, referrals, updateReferrals }: Props) => {
	const currentReferral = { ...editReferral };
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			// CSS Module doesn't work here, so use inline styling
			style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<FormGroup classes={{ root: style.form }}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{editReferral ? 'Update ' : 'Create '}Referral
				</Typography>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="given-name">Given Name</InputLabel>
					<Input
						id="given-name"
						defaultValue={currentReferral.givenName || ''}
						onChange={event => {
							currentReferral.givenName = event.target.value
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="surname">SurName</InputLabel>
					<Input
						id="surname"
						defaultValue={currentReferral.surName || ''}
						onChange={event => {
							currentReferral.surName = event.target.value
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="email" >Email</InputLabel>
					<Input
						id="email"
						defaultValue={currentReferral.email || ''}
						onChange={event => {
							currentReferral.email = event.target.value;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="phone">Phone</InputLabel>
					<Input
						id="phone"
						defaultValue={currentReferral.phone || ''}
						onChange={event => {
							currentReferral.phone = event.target.value;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="address">Address</InputLabel>
					<Input
						id="address"
						defaultValue={currentReferral.addressLine || ''}
						onChange={event => {
							currentReferral.addressLine = event.target.value;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="suburb">Suburb</InputLabel>
					<Input
						id="suburb"
						defaultValue={currentReferral.suburb || ''}
						onChange={event => {
							currentReferral.suburb = event.target.value;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="state">State</InputLabel>
					<Input
						id="state"
						defaultValue={currentReferral.state || ''}
						onChange={event => {
							currentReferral.state = event.target.value;
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="postcode">Postcode</InputLabel>
					<Input
						id="postcode"
						defaultValue={currentReferral.postCode || ''}
						onChange={event => {
							currentReferral.postCode = event.target.value
						}}
					/>
				</div>
				<div className={style.inputWrapper}>
					<InputLabel htmlFor="country">Country</InputLabel>
					<Input
						id="country"
						defaultValue={currentReferral.country || ''}
						onChange={event => {
							currentReferral.country = event.target.value;
						}}
					/>
				</div>

				<div>

					<Button onClick={onClose} startIcon={<Cancel />} variant="outlined">
						Cancel
					</Button>
					<Button startIcon={<Save />} variant="contained" onClick={async () => {
						if (currentReferral.id) {
							const res = await updateReferral(currentReferral);
							if (res.status === 200) {
								updateReferrals([...referrals.map(element => {
									if (element.id === currentReferral.id) {
										return { ...currentReferral };
									}
									return element;
								})])
								onClose();
							}
						} else {
							const res = await createReferral(currentReferral);
							if (res) {
								const allReferrals = [...referrals];
								allReferrals.push(res);
								updateReferrals(allReferrals);
								onClose();
							}
						}

					}}>
						{editReferral ? 'Save' : 'Create'}
					</Button>
				</div>
			</FormGroup>
		</Modal>
	)
};

export default EditModal;