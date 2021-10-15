// Write a functional react component that renders a reactstrap modal.
// The modal should have an input field and a button.
// When the button is clicked, the input field value should be added to the list of traits.
// The modal should be closed when the button is clicked.
// The modal should not be closed when the user clicks the backdrop.

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

interface Props {
  isOpen: boolean
  toggle: any
  onSubmit: (data: any) => void
}

export const AddTraitModal = ({
  isOpen,
  toggle,
  onSubmit
}: Props) => {
  const [trait, setTrait] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrait(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Trait</ModalHeader>
      <ModalBody>
        <input
          type="text"
          name="trait"
          id="traitInput"
          value={trait}
          onChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSubmit(trait)}>
          Add
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
