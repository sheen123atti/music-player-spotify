import React from 'react';
import './widgetCard.css';
import WidgetEntry from './WidgetEntry';
import { IconContext } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';

export default function WidgetCard({ title, similar, featured, newReleases }) {
    console.log(
        "similar",
        similar,
        "featured",
        featured,
        "newReleases",
        newReleases
    );
    return (
        <div className='widgetcard-body'>
            <p className='widget-title'>{title}</p>
            {
                similar ? similar.map((artist) => (
                    <div key={artist.id}>
                        <WidgetEntry
                            title={artist?.name}
                            subtitle={artist?.followers?.total + " Followers"}
                            image={artist?.images[2].url}
                        />
                    </div>
                )) : featured ? featured.map((playlist) => (
                    <div key={playlist.id}>
                        <WidgetEntry
                            title={playlist?.name}
                            subtitle={playlist?.tracks?.total + " Songs"}
                            image={playlist?.images[0]?.url}
                        />
                    </div>
                )) : newReleases ? newReleases.map((album) => (
                    <div key={album.id}>
                        <WidgetEntry
                            title={album?.name}
                            subtitle={album?.artists[0]?.name}
                            image={album?.images[2]?.url}
                        />
                    </div>
                )) : null
            }
            <div className='widget-fade'>
                <div className='fade-button'>
                    <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
                        <FiChevronRight />
                    </IconContext.Provider>
                </div>
            </div>
        </div >
    )
}
