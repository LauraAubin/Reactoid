import * as React from 'react';

import { Modal } from '@shopify/polaris';

interface Props {
  modalActive: boolean;
  handleModal(): void;
}

export default function BackModal({ modalActive, handleModal }: Props) {
  return (
    <Modal
      open={modalActive}
      onClose={handleModal}
      title='Go back to the home page?'
      primaryAction={{
        content: 'Leave this page',
        url: '/'
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleModal
        }
      ]}
    >
      <Modal.Section>
        Leaving this page will delete your drawing. Are you sure you want to
        proceed?
      </Modal.Section>
    </Modal>
  );
}
