import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';
import Layout from './layout';
import { routeItems } from './core/constants/menu';
import { RouteItemProp } from './core/interfaces/base';
import { WatchCertificationPage } from './pages/display';

const App = () => {

  const userRole = useSelector((state:any) => state.app.role );
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {
            routeItems.filter((item:RouteItemProp) => item.owner <= userRole).map((item:RouteItemProp, index:number) => {
              return (
                <Route path={item.url} element={item.element} key={index}/>
              )
            })
          }
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
