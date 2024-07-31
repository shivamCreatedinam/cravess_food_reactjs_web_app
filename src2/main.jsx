// main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './Redux/Store';

import AddRestaurant from './pages/AddRestaurant/AddRestaurant';
import ShowCase from './pages/ShowCase/ShowCase';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import User from './pages/User/User';
import GetTheApp from './pages/GetTheApp/GetTheApp';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SkipedPage from './pages/SkipedPage/SkipedPage';
import UserSettingsPage from './pages/UserSettingsPage/UserSettingsPage';
import TestPage from './pages/TestPage/TestPage';
import App from './App';
import './index.css';
import { RestaurantRegistration } from './components/AddRestaurantComponents/AddRestaurantHeader/RestaurantRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/register_restaurant" element={<RestaurantRegistration />} />
        <Route path="/show-case" element={<ShowCase />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/user/:userId/:hashId" element={<User />} />
        <Route path="/user/:userId/notifications" element={<SkipedPage />} />
        <Route path="/user/:userId/network" element={<SkipedPage />} />
        <Route path="/user/:userId/find-friends" element={<SkipedPage />} />
        <Route path="/user/:userId/settings" element={<UserSettingsPage />} />
        <Route path="/get-the-app" element={<GetTheApp />} />
        <Route path="/:city/:hotel" element={<RestaurantPage />} />
        <Route path="/:city/:hotel/:page" element={<RestaurantPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
