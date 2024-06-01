import React, { useEffect, useState } from 'react';
import './player.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../spotify';
import SongCard from '../components/songCard/SongCard';
import Queue from '../components/Queue';
import AudioPlayer from '../components/audioPlayer/AudioPlayer';
import Widgets from '../components/Widgets';

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currTrack, setCurrTrack] = useState({});
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(()=>{
    if(location.state){
      apiClient.get('playlists/' + location.state?.id + '/tracks')
      .then((res) => {
        setTracks(res.data.items);
        setCurrTrack(res.data?.items[0]?.track);
      });
    }
  }, [location.state]);

  useEffect(()=>{
    setCurrTrack(tracks[currIndex]?.track);
  }, [currIndex, tracks]);

  return (
    <div className='screen-container flex'>
      <div className='left-player-body'>
        <AudioPlayer currTrack={currTrack} total={tracks} currIndex={currIndex} setCurrIndex={setCurrIndex} />
        <Widgets artistID={currTrack?.album?.artists[0]?.id} />
      </div>
      <div className='right-player-body'>
        <SongCard album={currTrack?.album} />
        <Queue tracks={tracks} setCurrIndex={setCurrIndex} />
      </div>
    </div>
  )
}
