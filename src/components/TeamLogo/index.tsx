import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  UploadFile,
  UploadChangeParam,
  RcFile,
} from 'antd/lib/upload/interface';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame } from '@/models/gameData';
import store from '@/models/index';
import styles from './index.module.less';

const TeamLogo = ({ side }: { side: string }) => {
  const { logo: imageUrl } = useSelector(
    (state) => state.gameData[`${side}Team`]
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  //
  const getBase64 = (
    img: RcFile | undefined,
    callback: (url: string) => void
  ) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  //
  const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };
  //
  const handleChange = (info: UploadChangeParam) => {
    getBase64(info.file.originFileObj, (url) => {
      if (imageUrl !== url) {
        dispatch(
          updateGame({
            [`${side}Team`]: {
              ...store.getState().gameData[`${side}Team`],
              logo: url,
            },
          })
        );
        setLoading(false);
      }
    });
  };

  return (
    <Upload
      className={`${styles.teamLogoContainer} ${
        imageUrl.length > 0 ? styles.teamLogoContainer_loaded : ''
      }`}
      name="avatar"
      listType="picture-card"
      // className="avatar-uploader"
      showUploadList={false}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      accept="image/*"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default TeamLogo;
