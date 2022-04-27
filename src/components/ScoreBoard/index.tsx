import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '@/models/gameData';
import store from '@/models/index';
import { QUATER_ARRAY } from '@/utils/constant';
import tik from '@/assets/sound/tik.mp3';
import buzz from '@/assets/sound/buzz.mp3';
import styles from './index.module.less';

const INTERVAL = 0.1 * 1000;

const ScoreBoard = ({ leftScore, rightScore }) => {
  const { quater, quaterTime, offenceTime } = useSelector(
    (state) => state.gameData
  );
  const { quaterDuration, quaterCount, offenceDuration, clockBuzzer } =
    useSelector((state) => state.settingData);
  const dispatch = useDispatch();

  const [isTimeRunning, setIsTimeRunning] = React.useState(false);

  const quaterArray = [
    ...QUATER_ARRAY.slice(0, quaterCount),
    ...QUATER_ARRAY.slice(QUATER_ARRAY.indexOf('OT')),
  ];

  const timer = React.useRef<number>();
  //
  const toggleQuater = () => {
    dispatch(
      updateGame({
        quater:
          quaterArray[(quaterArray.indexOf(quater) + 1) % quaterArray.length],
      })
    );
  };
  //
  const offenceTimeFormatter = (millisecond: number) => {
    const second = millisecond / 1000;
    return second < 10 ? second.toFixed(1) : Math.ceil(second);
  };
  //
  const quaterTimeFormatter = (millisecond: number) => {
    const minute = Math.floor(Math.ceil(millisecond / 1000) / 60);
    const second = Math.floor(Math.ceil(millisecond / 1000) % 60);
    // console.log(minute, second);
    return `${`${minute}`.padStart(2, '0')}:${`${second}`.padStart(2, '0')}`;
  };
  const stopTimeRunning = () => {
    setIsTimeRunning(false);
  };
  //
  const toggleTimeRunning = () => {
    setIsTimeRunning(!isTimeRunning);
    if (!isTimeRunning) {
      if (offenceTime === 0) {
        dispatch(updateGame({ offenceTime: offenceDuration }));
      }
      if (quaterTime === 0) {
        dispatch(updateGame({ quaterTime: quaterDuration }));
      }
    }
  };
  //
  const onResetOffenceTime = () => {
    dispatch(updateGame({ offenceTime: offenceDuration }));
  };

  React.useEffect(() => {
    if (isTimeRunning) {
      //
      const intervalCallback = () => {
        const currentOffenceTime =
          store.getState().gameData.offenceTime - INTERVAL;
        const currentQuaterTime =
          store.getState().gameData.quaterTime - INTERVAL;
        dispatch(updateGame({ offenceTime: currentOffenceTime }));
        dispatch(updateGame({ quaterTime: currentQuaterTime }));
        if (currentOffenceTime === 0 || currentQuaterTime === 0) {
          setIsTimeRunning(false);
        }
        if (clockBuzzer) {
          if (currentOffenceTime <= 4 * 1000) {
            if (currentOffenceTime === 0) {
              new Audio(buzz).play();
            } else if (currentOffenceTime % 1000 === 0) {
              new Audio(tik).play();
            }
          }
        }
      };
      timer.current = window.setInterval(intervalCallback, INTERVAL);
    }
    return () => {
      window.clearInterval(timer.current);
    };
  }, [isTimeRunning, dispatch, clockBuzzer]);

  React.useEffect(() => {
    window.addEventListener('onResetGame', stopTimeRunning);
    return () => {
      window.removeEventListener('onResetGame', stopTimeRunning);
    };
  }, []);

  return (
    <div className={styles['score-board-container']}>
      <h1 className={styles['score-board-text']}>
        <p style={{ flex: 1, textAlign: 'right' }}>{leftScore}</p>
        <p style={{ margin: '0 12px' }}>:</p>
        <p style={{ flex: 1, textAlign: 'left' }}>{rightScore}</p>
      </h1>
      <div className={styles['time-section-container']}>
        <h3
          className={styles['time-section']}
          style={{ textAlign: 'left' }}
          onClick={onResetOffenceTime}
        >
          <p>{offenceTimeFormatter(offenceTime)}</p>
        </h3>
        <h3
          className={styles['time-section']}
          style={{ textAlign: 'center' }}
          onClick={toggleTimeRunning}
        >
          <p>{quaterTimeFormatter(quaterTime)}</p>
        </h3>
        <h3
          className={styles['time-section']}
          style={{ textAlign: 'right' }}
          onClick={toggleQuater}
        >
          <p>{quater}</p>
        </h3>
      </div>
    </div>
  );
};

export default ScoreBoard;
