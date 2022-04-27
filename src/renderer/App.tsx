import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.less';
import IndexPage from '@/pages/IndexPage';
import store from '@/models/index';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
