import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './layout';
import { routeItems } from './core/constants/menu';
import { RouteItemProp } from './core/interfaces/base';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {
            routeItems.map((item:RouteItemProp, index:number) => {
              return (
                <Route path={item.url} element={item.element} key={index}/>
              )
            })
          }
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
