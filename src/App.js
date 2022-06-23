import React, { useEffect } from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { HeroBanner, Loading, MessageBox, Navigation } from './components';
import { SignUp, Login, Spaces, SpaceDetails, MySpace } from './pages';
// import Navigation from './components/Navigation';
// import Loading from './components/Loading';
// import HeroBanner from './components/HeroBanner';
// import MessageBox from './components/MessageBox';
// import SignUp from './pages/SignUp';
// import Login from './pages/Login';

import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from './store/appState/selectors';
import { getUserWithStoredToken } from './store/user/actions';

//  Original code:
// const Home = () => (
//   <HeroBanner>
//     <h1>Home</h1>
//   </HeroBanner>
// );
// const Other = () => (
//   <HeroBanner>
//     <h1>Other</h1>
//   </HeroBanner>
// );

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Spaces />} />
        {/* <Route path="/other" element={<Other />} /> */}
        <Route path="/myspace" element={<MySpace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spaces/:id" element={<SpaceDetails />} />
      </Routes>
    </div>
  );
}

export default App;
