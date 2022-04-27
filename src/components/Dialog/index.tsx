import React from 'react';
import { Modal } from 'antd';
import styles from './index.module.less';

const Footer = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles['footer-container']}>
      <div role="button" className={styles['footer-button']} onClick={onCancel}>
        Cancel
      </div>
      <div
        role="button"
        className={styles['footer-button']}
        onClick={onConfirm}
      >
        Confirm
      </div>
    </div>
  );
};

const Dialog = ({ title, content, open, onClose, onConfirm }) => {
  return (
    <Modal
      className={styles['modal-container']}
      title={title}
      visible={open}
      onCancel={onClose}
      footer={<Footer onCancel={onClose} onConfirm={onConfirm} />}
      transitionName=""
      maskStyle={{ backdropFilter: 'blur(4px)' }}
      width={400}
      destroyOnClose
    >
      <div>{content}</div>
    </Modal>
  );
};

export default Dialog;
