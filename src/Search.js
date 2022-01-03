import React, { useState } from 'react';

export const Search = props => {
    const [channelId, setChannelId] = useState('');
    return (
        <div>
            <div className="search">
                <input type ="text" onChange={event => setChannelId(event.target.value)}placeholder="Enter your favourit channel ID"/>
                <button onClick={()=>props.setCurrendChannelId(channelId)}>Get Videos</button>
            </div>
            <div className="search__error">
                {props.searchError}
            </div>
        </div>
    
)};

