import React, { SyntheticEvent } from 'react';
import { Table, Popconfirm } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, updatePlayer, sortPlayer } from '@/models/playerData';
import { useLongPress } from 'use-long-press';
import { includes } from 'lodash';
import styles from './index.module.less';
import './index.less';

//
const DragHandle = SortableHandle(() => {
  return (
    <MenuOutlined
      style={{ cursor: 'grab', color: 'rgba(0, 0, 0, 0.2)', fontSize: '20px' }}
    />
  );
});
//
const CountButton = ({ text, record, index, field }) => {
  const dispatch = useDispatch();
  //
  const onClick = React.useCallback(() => {
    const newRecord = { ...record, [field]: record[field] + 1 };
    dispatch(updatePlayer(newRecord));
  }, [dispatch, record, field]);
  //
  const onLongClick = React.useCallback(() => {
    if (record[field] <= 0) return;
    const newRecord = { ...record, [field]: record[field] - 1 };
    dispatch(updatePlayer(newRecord));
  }, [dispatch, record, field]);
  //
  const bind = useLongPress(onLongClick, {
    onCancel: onClick,
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
  });

  return (
    <div className={styles['count-button-container']}>
      <div className={styles['count-button']} {...bind()}>
        {text}
      </div>
    </div>
  );
};
//
const AddPlayerButton = ({ side }) => {
  const dispatch = useDispatch();
  //
  const onClick = React.useCallback(() => {
    dispatch(addPlayer({ side }));
  }, [dispatch, side]);

  return (
    <div
      role="button"
      className="flex-center"
      style={{ color: 'rgba(256, 256, 256, 0.6)', padding: '16px' }}
      onClick={onClick}
    >
      Add Player
    </div>
  );
};
//
const EditableRow = ({ text, record, index, field }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const textRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  //
  const onClick = () => {
    setIsEditing(true);
  };
  //
  const onBlur = (event: SyntheticEvent | Event) => {
    const input = event.target as HTMLElement;
    // console.log('onBlur', text, input.innerText);
    if (text !== input.innerText) {
      // setTimeout(() => {
      const newRecord = { ...record, [field]: input.innerText.trim() };
      dispatch(updatePlayer(newRecord));
      // }, 0);
    }
    setIsEditing(false);
    textRef.current?.scroll(0, 0);
  };
  //
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (includes(['Escape', 'Enter'], event.key)) {
      event.preventDefault();
      onBlur(event);
    }
    if (field === 'number') {
      const input = event.target as HTMLElement;
      if (input.innerText.length >= 3 && event.key !== 'Backspace') {
        event.preventDefault();
      }
    }
  };

  return (
    <div className={styles['editable-row-container']} spellCheck={false}>
      <div
        role="button"
        className={
          styles[isEditing ? 'editable-text-editing' : 'editable-text']
        }
        ref={textRef}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        contentEditable
        suppressContentEditableWarning
      >
        {text}
      </div>
    </div>
  );
};

const columns = [
  {
    // title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    align: 'center',
    render: () => <DragHandle />,
  },
  {
    title: 'Num',
    dataIndex: 'number',
    width: 100,
    // ellipsis: true,
    align: 'center',
    render: (text, record, index) => (
      <EditableRow text={text} record={record} index={index} field="number" />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    ellipsis: true,
    className: 'drag-visible',
    align: 'center',
    editable: true,
    render: (text, record, index) => (
      <EditableRow text={text} record={record} index={index} field="name" />
    ),
  },
  {
    title: 'Foul',
    width: 100,
    dataIndex: 'foul',
    align: 'center',
    render: (text, record, index) => (
      <CountButton text={text} record={record} index={index} field="foul" />
    ),
  },
  {
    title: 'Score',
    width: 100,
    dataIndex: 'score',
    align: 'center',
    render: (text, record, index) => (
      <CountButton text={text} record={record} index={index} field="score" />
    ),
  },
];

const SortableItem = SortableElement((props) => {
  return <tr {...props} />;
});
const SortableBody = SortableContainer((props) => {
  return <tbody {...props} />;
});

const SortableTable = ({ side, data }) => {
  const dispatch = useDispatch();
  //
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;
    dispatch(sortPlayer({ side, oldIndex, newIndex }));
  };
  //
  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      pressDelay={10}
      {...props}
    />
  );
  //
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <Table
      className={styles.player_list_container}
      pagination={false}
      dataSource={data}
      columns={columns}
      rowKey="index"
      // scroll={{ y: '100%' }}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
      footer={() => <AddPlayerButton side={side} />}
    />
  );
};

export default SortableTable;
