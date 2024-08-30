import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import PlanTripStartPage from './pages/PlanTripStartPage';
import ClipStartPage from './pages/ClipStartPage.jsx';
import PlanTripPage from './pages/PlanTripPage';
import MobileLogin from './MobileLogin';
import MobileTrip from './MobileTrip';
import MobileTripDetail from './MobileTripDetail';
import MobilePost from './MobilePost';
import MobilePostDetail from './MobilePostDetail';
import MobileClip from './MobileClip';
import MobileClipDetail from './MobileClipDetail';
import Login from './Login';
import CallBack from './CallBack';
import Main from './Main';
import Plan from './Plan';
import PlanDetail from './PlanDetail';
import Post from './Post';
import PostDetail from './PostDetail';
import MyPage from './MyPage';
import MyPageModify from './MyPageModify';
import AdminLogin from './AdminLogin';
import Admin from './Admin';
import AdminManage from './AdminManage';
import AdminManageClip from './AdminManageClip';
import AdminManagePost from './AdminManagePost';
import AdminManageNotice from './AdminManageNotice';
import AdminManageTrip from './AdminManageTrip'; 


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
            <Route path="/planTripStartPage" element={<PlanTripStartPage />} />
            <Route path="/clipStartPage" element={<ClipStartPage />} />
            <Route path="/planTripPage" element={<PlanTripPage />}/>
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
