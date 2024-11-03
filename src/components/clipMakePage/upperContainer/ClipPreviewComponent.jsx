import { GetAxiosInstance } from '../../../axios/AxiosMethod';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const ClipPreviewComponent = (props) => {

    const [imagesFile, setImagesFile] = useState([])

    const addImageFile = (newImages) => {
        const imageArray = Array.from(newImages)
        setImagesFile(prev => [...prev, ...imageArray])
    }

    const load = async () => {
        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
    };
    
    const createVideo = async () => {
        await load();

        // 슬라이드용 파일 목록 생성
        for (let i = 0; i < imagesFile.length; i++) {
            const fileName = `image-${i}.png`;
            ffmpeg.FS('writeFile', fileName, await fetchFile(imagesFile[i]));
        }

        await ffmpeg.run(
            '-framerate', '1', // 초당 1장의 이미지
            '-i', 'image-%d.png', // 패턴을 통해 이미지들을 불러옴
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-movflags', 'frag_keyframe+empty_moov',
            'output.mp4'
        );

        // 생성된 동영상을 가져와서 미리보기
        const data = ffmpeg.FS('readFile', 'output.mp4');
        const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

        // 기존 Blob URL이 있는 경우 해제
        if (props.videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
        
        const videoUrl = URL.createObjectURL(videoBlob);
        props.setVideoUrl(videoUrl);
    };

    return <>
        <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addImageFile(e.target.files)}
        />
        <button onClick={createVideo}>Create Video</button>
        {props.videoUrl && (
            <div>
            <video controls width="500">
                <source src={props.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            </div>
        )}
    </>
}

export default ClipPreviewComponent