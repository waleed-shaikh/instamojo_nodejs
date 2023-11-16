import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Success from './component/Success';
import Failure from './component/Failure';
import InstaMojo from './file/instamojo/InstaMojo';

function App() {
  return (
    <BrowserRouter>
      <div className='main'>
        <Routes>
          {/* Insta Mojo */}
          <Route exact path="/" element={<InstaMojo />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/failure' element={<Failure />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
