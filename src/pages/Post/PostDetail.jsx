import React from 'react';
import Header from '../../layout/Header';
import LeftContainer from '../../components/post/PostLeftContainer';
import RightContainer from '../../components/post/PostRightContainer';
import { useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';

const PostDetail = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    return (
        <div>
            <Header />
            <Container>
                <LeftContainer post={post} isLoaded={isLoaded} />
                <RightContainer post={post} />
            </Container>
        </div>
    );
};

export default PostDetail;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 30px 60px;
`;

// ********* 더미데이터 삭제 예정 ***********
const post = {
    title: "TAEAN Trip",
    with: "친구와",
    profilePic: "../src/assets/images/profile/142F50F2-F6E7-44E9-8115-532D35D93BE3.jpeg",
    dates: ["2023.10.28", "2023.10.29"],
    places: [
        { name: "유명해물나라", location: { lat: 36.7894, lng: 126.3718 } },
        { name: "태안동부시장", location: { lat: 36.7452, lng: 126.2983 } },
        { name: "신두리해수욕장", location: { lat: 36.7333, lng: 126.3022 } },
        { name: "한마음 오션플레이스", location: { lat: 36.7658, lng: 126.3721 } }
    ],
    days: {
        "2023.10.28": [
            {
                name: "유명해물나라",
                images: ["../src/assets/images/profile/0E87733C-A7B2-4824-8EA6-BE93115A06C9.jpeg", "../src/assets/images/profile/4FBA70D0-8065-4E65-A3FA-3D79256B83E7_1_102_o.jpeg"]
            },
            {
                name: "태안동부시장",
                images: ["../src/assets/images/profile/05B8DCAE-CA47-4119-B19A-EEC132BEDA0E.jpeg", "../src/assets/images/profile/370FFB2C-0848-4097-B604-248A582A3835.jpeg"]
            }
        ],
        "2023.10.29": [
            {
                name: "신두리해수욕장",
                images: ["../src/assets/images/profile/995DEE26-409D-4F4A-9355-EEB84057EE7B_1_105_c.jpeg", "../src/assets/images/profile/652655D6-7B2D-4CCC-878F-906139649537.jpeg"]
            },
            {
                name: "한마음 오션플레이스",
                images: ["../src/assets/images/profile/90263554-A17D-4A49-B3E2-6C6915C0B76E_1_105_c.jpeg", "../src/assets/images/profile/IMG_7478.jpeg"]
            }
        ]
    }
};