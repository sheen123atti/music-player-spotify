import React, { useEffect, useState } from 'react'; // , { useEffect, useState } 
import SidebarButtons from './SidebarButtons';
import './sidebar.css';
import { MdFavorite } from 'react-icons/md';
import { FaGripfire, FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import apiClient from '../spotify';

export default function Sidebar() {
  const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg");
  useEffect(()=>{
    apiClient.get("me").then(response => {
      //setImage(response.data?.images[0]?.url);
      (response.data?.images[0]?.url) ? setImage(response.data?.images[0]?.url) : setImage(image);
    })
  },[image]);
  return (
    <div className='sidebar-container'>
        <img src={image}
        className='profile-img'
        alt='profile' />
        <div>
            <SidebarButtons title="Feed" to="/feed" icon={<MdSpaceDashboard/>} />
            <SidebarButtons title="Trending" to="/trending" icon={<FaGripfire/>} />
            <SidebarButtons title="Player" to="/player" icon={<FaPlay/>} />
            <SidebarButtons title="Favourites" to="/favourites" icon={<MdFavorite/>} />
            <SidebarButtons title="Library" to="/" icon={<IoLibrary/>} />
        </div>
        <SidebarButtons title="Sign Out" to="" icon={<FaSignOutAlt/>} />
    </div>
  )
}
