import React from 'react';
import TrendBackground from '@/components/TrendBackground';
import Jumbotron from '@/components/Jumbotron';
import PlayerList from '@/components/PlayerList';
import SettingPanel from '@/components/SettingPanel';

const IndexPage = () => {
  return (
    <>
      <SettingPanel />
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        <TrendBackground />
        <div
          style={{
            position: 'absolute',
            inset: '0 0 0 0',
            padding: '48px 24px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          <Jumbotron />
          <div
            style={{
              paddingTop: '36px',
              // border: '1px solid #fff',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              flex: 1,
              height: 0,
            }}
          >
            <div style={{ width: '48%' }}>
              <PlayerList side="left" />
            </div>
            <div style={{ width: '48%' }}>
              <PlayerList side="right" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
