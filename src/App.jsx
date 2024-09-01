import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MobileClipReady from './pages/Plan/MobileClipReady.jsx';
import MobileLogin from './pages/Mobile/MobileLogin';
import MobileTrip from './pages/Mobile/MobileTrip';
import MobileTripDetail from './pages/Mobile/MobileTripDetail';
import MobilePost from './pages/Mobile/MobilePost';
import MobilePostDetail from './pages/Mobile/MobilePostDetail';
import MobileClip from './pages/Mobile/MobileClip';
import MobileClipDetail from './pages/Mobile/MobileClipDetail';
import Login from './pages/User/Login';
import Main from './pages/Main';
import CallBack from '../src/auth/CallBack';
import Plan from './pages/Plan/Plan';
import PlanDetail from './pages/Plan/PlanDetail';
import Post from './pages/Post/Post';
import PostDetail from './pages/Post/PostDetail';
import MyPage from './pages/User/MyPage';
import MyPageModify from './pages/User/MyPageModify';
import AdminLogin from './pages/Admin/AdminLogin';
import Admin from './pages/Admin/Admin';
import AdminManage from './pages/Admin/AdminManage';
import AdminManageClip from './pages/Admin/AdminManageClip';
import AdminManagePost from './pages/Admin/AdminManagePost';
import AdminManageNotice from './pages/Admin/AdminManageNotice';
import AdminManageTrip from './pages/Admin/AdminManageTrip';
import { setIsMobile } from './redux/auth/AuthActions.js';

function App() {
  const isMobile = useSelector((state) => state.auth.isMobile);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    dispatch(setIsMobile(mobileCheck));
    if (mobileCheck && !window.location.hostname.startsWith('m.')) {
      window.location.href = `${location.pathname}`;
    }
  }, [location, isMobile]);

  return (
    <Routes>
      {isMobile ? (
        <>
          <Route path="/login" element={<MobileLogin />} />
          <Route path="/trip" element={<MobileTrip />} />
          <Route path="/trip/:tripId" element={<MobileTripDetail />} />
          <Route path="/post" element={<MobilePost />} />
          <Route path="/post/:postId" element={<MobilePostDetail />} />
          <Route path="/clip" element={<MobileClip />} />
          <Route path="/clip/:clipId" element={<MobileClipDetail />} />
          <Route path="/planTripStartPage" element={<PlanTripStartPage />} />
          <Route path="/clip/:clipId/ready" element={<ClipStartPage />} />
          <Route path="/planTripPage" element={<PlanTripPage />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<CallBack />} />
          <Route path="/main" element={<Main />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/plan/:planId" element={<PlanDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/modify" element={<MyPageModify />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<Admin />} />
          <Route path="/admin/manage" element={<AdminManage />} />
          <Route path="/admin/manage/clip" element={<AdminManageClip />} />
          <Route path="/admin/manage/post" element={<AdminManagePost />} />
          <Route path="/admin/manage/notice" element={<AdminManageNotice />} />
          <Route path="/manage/trip" element={<AdminManageTrip />} />
        </>
      )}
    </Routes>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
