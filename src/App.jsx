import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';

export const PageWithHeader = ({children}) => (
  <div className="flex h-full w-full flex-col">{children}</div>
);

export const App = () => (
  <BrowserRouter>
        <div className="h-full">
          <Router/>
        </div>
  </BrowserRouter>
);
