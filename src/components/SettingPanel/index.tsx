import React from 'react';
import { Button, Modal, InputNumber, Switch } from 'antd';
import {
  ReloadOutlined,
  SettingOutlined,
  CheckOutlined,
  CloseOutlined,
  BackwardOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateSetting } from '@/models/settingData';
import { ActionCreators } from 'redux-undo';
import { resetGame } from '@/models/gameData';
import { resetPlayer } from '@/models/playerData';
import * as ls from 'local-storage';
import Dialog from '@/components/Dialog';
import styles from './index.module.less';

const SettingDialog = ({ open, onClose }) => {
  const { offenceDuration, quaterDuration, quaterCount, clockBuzzer } =
    useSelector((state) => state.settingData);
  const dispatch = useDispatch();

  const offenceTimeRef = React.useRef();
  const quaterTimeRef = React.useRef();
  const quaterCountRef = React.useRef();
  const clockBuzzerRef = React.useRef();
  //
  const onConfirm = () => {
    dispatch(
      updateSetting({
        offenceDuration: offenceTimeRef.current.value * 1000,
        quaterDuration: quaterTimeRef.current.value * 60 * 1000,
        quaterCount: quaterCountRef.current.value,
        clockBuzzer: clockBuzzerRef.current.ariaChecked === 'true',
      })
    );
    onClose();
  };
  return (
    <Dialog
      title="Setting Panel"
      content={
        <div className={styles['setting-dialog-container']}>
          <div className={styles['setting-section']}>
            Shot Clock:
            <InputNumber
              ref={offenceTimeRef}
              addonAfter="seconds"
              min={12}
              max={48}
              precision={0}
              defaultValue={offenceDuration / 1000}
            />
          </div>
          <div className={styles['setting-section']}>
            Quater Length:
            <InputNumber
              ref={quaterTimeRef}
              addonAfter="minutes"
              min={4}
              max={48}
              defaultValue={quaterDuration / 60 / 1000}
            />
          </div>
          <div className={styles['setting-section']}>
            Quater Count:
            <InputNumber
              ref={quaterCountRef}
              addonAfter="quaters"
              min={1}
              max={8}
              defaultValue={quaterCount}
            />
          </div>
          <div className={styles['setting-section']}>
            Clock Buzzer:
            <Switch
              ref={clockBuzzerRef}
              defaultChecked={clockBuzzer}
              // className={styles.switch}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </div>
        </div>
      }
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

const SettingPanel = () => {
  const [showReloadDialog, setShowReloadDialog] = React.useState(false);
  const [showSettingDialog, setShowSettingDialog] = React.useState(false);
  const { offenceDuration, quaterDuration } = useSelector(
    (state) => state.settingData
  );
  const { past } = useSelector((state) => state.playerData);

  const dispatch = useDispatch();
  const containerRef = React.useRef<HTMLDivElement>();
  //
  const onMouseEnter = () => {
    containerRef.current.style.transform = 'translate(-50%, 0)';
  };
  //
  const onMouseLeave = () => {
    containerRef.current.style.transform = 'translate(-50%, -48px)';
  };
  //
  const onResetGame = () => {
    // console.log('RESET GAME');
    window.dispatchEvent(new CustomEvent('onResetGame'));
    dispatch(
      resetGame({ quaterTime: quaterDuration, offenceTime: offenceDuration })
    );
    dispatch(resetPlayer());
    ls.clear();
    setShowReloadDialog(false);
  };
  return (
    <>
      <div
        className={styles['setting-panel-container']}
        ref={containerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles['setting-panel']}>
          <div
            role="button"
            className={`${styles.button} ${
              past.length === 0 && styles['button-disabled']
            }`}
            // onClick={() => dispatch(ActionCreators.undo())}
            onClick={() => dispatch(ActionCreators.undo())}
          >
            <BackwardOutlined />
          </div>
          <div
            role="button"
            className={styles.button}
            onClick={() => setShowReloadDialog(true)}
          >
            <ReloadOutlined />
          </div>
          <div
            role="button"
            className={styles.button}
            onClick={() => setShowSettingDialog(true)}
          >
            <SettingOutlined />
          </div>
        </div>
      </div>
      <Dialog
        title="Reset the game?"
        content="Are you sure to reset the game? All of the statistics will be reset."
        open={showReloadDialog}
        onClose={() => setShowReloadDialog(false)}
        onConfirm={onResetGame}
      />
      <SettingDialog
        open={showSettingDialog}
        onClose={() => setShowSettingDialog(false)}
      />
    </>
  );
};

export default SettingPanel;
