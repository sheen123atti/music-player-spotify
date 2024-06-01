import React, { useEffect, useRef, useState } from 'react';
import './audioPlayer.css';
import ProgressCircle from './ProgressCircle';
import WaveAnimation from './WaveAnimation';
import Controls from './Controls';

export default function AudioPlayer({ currTrack, currIndex, setCurrIndex, total }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    var audioSrc = total[currIndex]?.track.preview_url;

    const audioRef = useRef(new Audio(total[0]?.track.preview_url));

    const intervalRef = useRef();

    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const currPercentage = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            }
            else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
        else {
            isReady.current = true;
        }
    }, [currIndex]);

    // Clean up content- tracks and audio run when component is dismounted
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    const handleNext = () => {
        if (currIndex < total.length - 1) {
            setCurrIndex(currIndex + 1);
        }
        else {
            setCurrIndex(0);
        }
    }

    const handlePrev = () => {
        if (currIndex - 1 < 0) {
            setCurrIndex(total.length - 1);
        }
        else {
            setCurrIndex(currIndex - 1);
        }
    }

    const addZero = (n) => {
        return n > 9 ? ""+n : "0" + n;
    }

    const artists = [];
    currTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });
    return (
        <div className='player-body flex'>
            <div className='player-left-body'>
                <ProgressCircle percentage={currPercentage} isPlaying={true} image={currTrack?.album?.images[0]?.url} size={300} color='#C96850' />
            </div>
            <div className='player-right-body flex'>
                <p className='song-title'>{currTrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className='player-right-bottom flex'>
                    <div className='song-duration flex'>
                        <p className='duration'>0:{addZero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className='duration'>0:30</p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>
        </div>
    )
}
