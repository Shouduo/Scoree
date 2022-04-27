import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '@/models';
import { updateGame } from '@/models/gameData';
import { includes } from 'lodash';
import { useLongPress } from 'use-long-press';
import styles from './index.module.less';
//
const TeamName = ({ side }) => {
  const { name } = useSelector((state) => state.gameData[`${side}Team`]);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);
  //
  const onClick = () => {
    setIsEditing(true);
  };
  //
  const onBlur = (event: React.SyntheticEvent | Event) => {
    const input = event.target as HTMLElement;
    if (name !== input.innerText) {
      dispatch(
        updateGame({
          [`${side}Team`]: {
            ...store.getState().gameData[`${side}Team`],
            name: input.innerText.trim(),
          },
        })
      );
    }
    setIsEditing(false);
    textRef.current?.scroll(0, 0);
  };
  //
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (includes(['Escape', 'Enter'], event.key)) {
      onBlur(event);
    }
  };

  return (
    <h3
      className={`${styles['editable-text']} ${
        isEditing ? styles.editing : ''
      }`}
      ref={textRef}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      spellCheck={false}
      contentEditable
      suppressContentEditableWarning
    >
      {name}
    </h3>
  );
};

const TechCount = ({ side, field }: { side: string; field: string }) => {
  const number = useSelector((state) => state.gameData[`${side}Team`][field]);
  const dispatch = useDispatch();
  //
  const onClick = React.useCallback(() => {
    // const newRecord = { ...record, [field]: record[field] + 1 };
    dispatch(
      updateGame({
        [`${side}Team`]: {
          ...store.getState().gameData[`${side}Team`],
          [field]: number + 1,
        },
      })
    );
  }, [dispatch, field, side, number]);
  //
  const onLongClick = React.useCallback(() => {
    if (number <= 0) return;
    dispatch(
      updateGame({
        [`${side}Team`]: {
          ...store.getState().gameData[`${side}Team`],
          [field]: number - 1,
        },
      })
    );
  }, [dispatch, field, side, number]);
  //
  const bind = useLongPress(onLongClick, {
    onCancel: onClick,
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
  });

  return (
    // <div className={styles['count-button-container']}>
    <h3 className={styles['count-button']} {...bind()}>
      {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${number}`}
    </h3>
    // </div>
  );
};

const TeamInfo = ({ side }) => {
  // const { timeOut, foul } = useSelector(
  //   (state) => state.gameData[`${side}Team`]
  // );
  // const dispatch = useDispatch();

  return (
    <div
      style={{
        width: '158px',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: side === 'left' ? 'flex-start' : 'flex-end',
        // flex: 0,
      }}
    >
      <TeamName side={side} />
      <TechCount side={side} field="timeOut" />
      <TechCount side={side} field="foul" />
      {/* <h3 style={{ fontSize: '32px' }}>Home</h3> */}
      {/* <h3 style={{ fontSize: '32px' }}>TimeOut: 1</h3>
      <h3 style={{ fontSize: '32px' }}>Foul: 2</h3> */}
    </div>
  );
};

export default TeamInfo;
