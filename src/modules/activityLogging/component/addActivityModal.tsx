import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

type IProps = {
  message : string
  modalState : boolean
  handleModalState : any
}
const AddActivityModal: React.FC<IProps> = (props : any) => {
  return (
    <div>
      <Modal
        isOpen={props.modalState}
        toggle={props.handleModalState}
      >
        <ModalHeader toggle={props.handleModalState}>Activity Logging</ModalHeader>
        <ModalBody>
          {props.message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.handleModalState}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AddActivityModal;
