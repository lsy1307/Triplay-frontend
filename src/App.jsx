import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Plan from './pages/Plan/Plan';
import Login from './pages/User/Login';
import CallBack from './auth/CallBack';

function App() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);

    if (mobileCheck && !window.location.hostname.startsWith('m.')) {
      window.location.href = `${location.pathname}`;
    }
  }, [location]);
  return (
    <BrowserRouter>
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
            <Route
              path="/admin/manage/notice"
              element={<AdminManageNotice />}
            />
            <Route path="/manage/trip" element={<AdminManageTrip />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
