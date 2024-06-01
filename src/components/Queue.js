import React from 'react';
import './queue.css';

export default function Queue({tracks, setCurrIndex}) {
    console.log(tracks);
    return (
    <div className='queue-container flex'>
        <div className='queue flex'>
            <p className='upNext'>Up Next</p>
            <div className='queue-list'>
                {tracks.map((track, index) => (
                    <div key={index + "key"} className='queue-item flex' onClick={() => setCurrIndex(index)}>
                        <p className='track-name'>{track?.track?.name}</p>
                        <p className='s'>0:30</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
