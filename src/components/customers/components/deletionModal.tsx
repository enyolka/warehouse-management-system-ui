import * as React from "react";
import { Box, Button, Modal } from "@mui/material";
import styles from "../customersPage.module.css";

type Props = {
  open: boolean;
  idx: number;
  handleClose: (value: React.SetStateAction<boolean>) => void;
  createRequest: (idx: number) => void;
};

const DeletionModal = ({ open, idx, handleClose, createRequest }: Props) => {
  const handleDeletion = () => {
    createRequest(idx);
    handleClose(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <h3>Are you sure you want to delete this item?</h3>
        <p>This item will be deleted immadietly, you can't undo this action</p>
        <Button onClick={() => handleClose(true)}>Cancel</Button>
        <Button onClick={handleDeletion}>Delete</Button>
      </Box>
    </Modal>
  );
};

export default DeletionModal;
