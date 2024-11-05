import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
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
import MobileClipMake from './pages/Plan/MobileClipMake.jsx';
import MobilePostMake from './pages/Plan/MobilePostMake.jsx';
import AdminRoute from './components/admin/AdminRoute.jsx';
import MobileMyPage from './pages/Mobile/MobileMyPage.jsx';
import MobileOutlet from './layout/MobileOutlet.jsx';

function App() {
  const isMobile = useSelector((state) => state.auth.isMobile);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    dispatch(setIsMobile(mobileCheck));
  }, [location, dispatch]);
  return (
    <Routes>
      {isMobile ? (
        <>
          <Route path="login" element={<MobileLogin />} />
          <Route path="/" element={<MobileOutlet />}>
            <Route index element={<Navigate to="/trip" />} />
            <Route path="callback" element={<CallBack />} />
            <Route path="trip" element={<MobileTrip />} />
            <Route path="trip/:tripId" element={<MobileTripDetail />} />
            <Route path="post" element={<MobilePost />} />
            <Route path="post/:postId" element={<MobilePostDetail />} />
            <Route path="clip" element={<MobileClip />} />
            <Route path="clip/:clipId" element={<MobileClipDetail />} />
            <Route path="trip/:tripId/post" element={<MobilePostMake />} />
            <Route path="trip/:tripId/clip" element={<MobileClipMake />} />
            <Route path="mypage" element={<MobileMyPage />} />
          </Route>
        </>
      ) : (
        <Route path="/">
          <Route index element={<Navigate to="/main" />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<CallBack />} />
          <Route path="main" element={<Main />} />
          <Route path="plan" element={<Plan />} />
          <Route path="plan/:planId" element={<PlanDetail />} />
          <Route path="post" element={<Post />} />
          <Route path="post/:postId" element={<PostDetail />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="mypage/modify" element={<MyPageModify />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route
            path="admin/home"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="admin/manage"
            element={
              <AdminRoute>
                <AdminManage />
              </AdminRoute>
            }
          />
          <Route
            path="admin/manage/clip"
            element={
              <AdminRoute>
                <AdminManageClip />
              </AdminRoute>
            }
          />
          <Route
            path="admin/manage/post"
            element={
              <AdminRoute>
                <AdminManagePost />
              </AdminRoute>
            }
          />
          <Route
            path="admin/manage/notice"
            element={
              <AdminRoute>
                <AdminManageNotice />
              </AdminRoute>
            }
          />
          <Route
            path="manage/trip"
            element={
              <AdminRoute>
                <AdminManageTrip />
              </AdminRoute>
            }
          />
        </Route>
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
