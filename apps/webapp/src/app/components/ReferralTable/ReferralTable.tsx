import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { ReactComponent as CreateIcon } from '../../../assets/create-24px.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete-24px.svg';
import { deleteReferralById } from '../../api/referral';
import { Referral } from '../../types/referral';
import ConfirmDialog from '../ConfirmDialog';
import EditModal from '../EditModal';
import { IconButton } from '../IconButton';
import style from './ReferralTable.module.css';

const TableHeadCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableHeadCell }}>{children}</TableCell>
);

const TableBodyCell: React.FC = ({ children }) => (
  <TableCell classes={{ root: style.tableBodyCell }}>{children}</TableCell>
);

interface ActionBodyCellProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const ActionBodyCell: React.FC<ActionBodyCellProps> = ({
  onEditClick,
  onDeleteClick,
}) => (
  <TableCell classes={{ root: style.actionBodyCell }}>
    <IconButton onClick={onEditClick}>
      <CreateIcon />
    </IconButton>
    <IconButton onClick={onDeleteClick}>
      <DeleteIcon />
    </IconButton>
  </TableCell>
);

interface ReferralTableProps {
  referrals: Referral[];
  updateReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
}

type ActionType = 'edit' | 'delete';

const deleteWarning = (referralName: string) => `Do you confirm to delete the referral: ${referralName}?`;

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals, updateReferrals }) => {
  const [chosenReferral, setChosenReferral] = useState<Referral>(null);
  const [actionModel, setActionModel] = useState<ActionType>(null);

  const finishAction = () => {
    setChosenReferral(null);
    setActionModel(null);
  }

  return (
    <React.Fragment>
      <TableContainer classes={{ root: style.container }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Given Name</TableHeadCell>
              <TableHeadCell>Surname</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Address</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referrals.map((referral) => (
              <TableRow key={referral.id}>
                <TableBodyCell>{referral.givenName}</TableBodyCell>
                <TableBodyCell>{referral.surName}</TableBodyCell>
                <TableBodyCell>{referral.email}</TableBodyCell>
                <TableBodyCell>{referral.phone}</TableBodyCell>
                <TableBodyCell>
                  {`${referral.addressLine || ''} ${referral.suburb || ''} ${referral.state || ''} ${referral.postCode || ''} ${referral.country || ''}`}
                </TableBodyCell>
                <ActionBodyCell
                  onEditClick={() => {
                    setChosenReferral(referral);
                    setActionModel('edit');
                  }
                  }
                  onDeleteClick={() => {
                    setChosenReferral(referral);
                    setActionModel('delete');
                  }
                  }
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={style.buttonWrapper}>
          <Button variant="contained" onClick={() => { setActionModel('edit') }}>Create New</Button>

        </div>

      </TableContainer>
      <ConfirmDialog
        open={!!chosenReferral && actionModel === 'delete'}
        onClose={() => {
          finishAction();
        }}
        content={deleteWarning(`${chosenReferral?.givenName || ''} ${chosenReferral?.surName || ''}`)}
        confirmAction={async () => {
          deleteReferralById(chosenReferral.id).then(res => {
            if (res.status === 200) {
              const deletedId = chosenReferral.id;
              updateReferrals(referrals.filter(element => element.id !== deletedId));
              finishAction();
            }
          })
        }}
      />
      <EditModal
        open={actionModel === 'edit'}
        onClose={() => {
          finishAction()
        }}
        editReferral={chosenReferral}
        referrals={referrals}
        updateReferrals={updateReferrals}
      />
    </React.Fragment>
  );
};

export { ReferralTable };
