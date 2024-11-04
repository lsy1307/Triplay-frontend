import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchUserDetail } from '../../api/userDetail';
import { uploadProfileImage } from '../../api/uploadProfile';
import { deleteProfileImage } from '../../api/deleteProfile';
import editProfileIcon from '../../assets/images/mypageModify/userInfoSection/EditProfileIcon.png';

const UserInfoSection = () => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    email: '',
    profilePicUrl: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userDetails = await fetchUserDetail();
        setUserInfo(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserInfo();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (newImage) {
      try {
        await uploadProfileImage(newImage);
        setUserInfo((prev) => ({ ...prev, profilePicUrl: URL.createObjectURL(newImage) }));
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    closeModal();
  };

  const handleDelete = async () => {
    try {
      await deleteProfileImage();
      console.log('Profile image deleted successfully');
    } catch (error) {
      console.error('Error deleting profile image:', error);
    }
    closeModal();
  };

  return (
    <>
      <InfoContainer>
        <ProfileContainer>
          <ProfileImage>
            <img src={userInfo.profilePicUrl || editProfileIcon} alt="Profile" />
          </ProfileImage>
          <EditIcon src={editProfileIcon} alt="Edit Profile" onClick={openModal} />
        </ProfileContainer>
        <UserNameContainer>
          <UserName>{userInfo.userName || '이름'}</UserName>
        </UserNameContainer>
        <UserDetail>
          <DetailRow>
            <label>이메일</label>
            <ValueWrapper>
              <Bracket>「</Bracket>
              <Value>{userInfo.email || '이메일을 가져올 수 없습니다.'}</Value>
              <Bracket>」</Bracket>
            </ValueWrapper>
          </DetailRow>
          <DetailRow>
            <label>닉네임</label>
            <ValueWrapper>
              <Bracket>「</Bracket>
              <Value>{userInfo.userName || '닉네임을 가져올 수 없습니다.'}</Value>
              <Bracket>」</Bracket>
            </ValueWrapper>
          </DetailRow>
        </UserDetail>
      </InfoContainer>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>✕</CloseButton>
            <h4>프로필 사진 수정</h4>
            <form onSubmit={handleUpload}>
              <FileInputWrapper>
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {newImage && <p>선택된 파일: {newImage.name}</p>}
              </FileInputWrapper>
              <ButtonContainer>
                <button type="button" onClick={handleDelete}>
                  사진 삭제
                </button>
                <button type="submit">사진 업로드</button>
              </ButtonContainer>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default UserInfoSection;

const InfoContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 30px 60px;
  border-radius: 10px;
  text-align: center;
  width: 50%;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
   object-fit: cover;
  background-color: #888;

  img {
    width: 100%;
    height: 100%;
  }
`;

const EditIcon = styled.img`
  position: absolute;
  bottom: -15px;
  right: 175px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  border: 2px double gray;
`;

const UserNameContainer = styled.div`
  border-bottom: 1px solid #999;
  margin-top: 40px;
`;

const UserName = styled.h2`
  margin-top: 10px;
  font-size: 24px;
  padding-bottom: 10px;
`;

const UserDetail = styled.div`
  margin-top: 20px;
  font-size: 20px;

  label {
    margin-left: 60px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
`;

const Value = styled.p`
  font-size: 18px;
  color: white;
  text-align: center;
  flex: 1;
`;

const Bracket = styled.p`
  font-size: 16px;
  color: #ccc;
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  height: 360px;
  width: 600px;
  position: relative;

  h4 {
    margin: 30px auto;
  }

  form {
    margin-top: 30px;

    label {
      display: block;
      margin-bottom: 10px;
    }
    input {
      margin: 30px 0 45px 135px;
    }
  }
`;

const FileInputWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;

  button {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #555;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;
