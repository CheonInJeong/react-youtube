import React, { useState, useEffect } from 'react';

export const App = () => {
    const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D'
    const [video, setVideo] = useState([]);
    const [currentChannelId, setCurrendChannelId] = useState(); //userState내부에 셋팅할 파라미터를 넣어주면 된다.
    const [channelId, setChannelId] = useState('');
    const [channelName, setChannelName] = useState();
    const [searchError, setSearchError] = useState('');
    useEffect(()=> {
        (async () => {
            if (currentChannelId) {
                try {
                    const data = await fetch(`${baseUrl}${currentChannelId}`)
                    .then(response => response.json());

                    if(!data.items) {
                        throw new Error();
                    }

                    setVideo(data.items);
                    setChannelName(data.items[0].author);
                    setSearchError('');
                    console.log(video);
                    console.log(data.items)
                } catch (err) {
                    console.warn(err);
                    setSearchError('Could not retrieve videos, check your channel ID');
                }
                
            }
            
        })();
    

    },[currentChannelId]);
    return (
        <div className="app-container">
             <h1>Latest Youtube video</h1>
             <div className="search">
                 <input type ="text" onChange={event => setChannelId(event.target.value)}placeholder="Enter your favourit channel ID"/>
                 <button onClick={()=>setCurrendChannelId(channelId)}>Get Videos</button>
             </div>
             <div className="search__error">
                 {searchError}
             </div>
             {channelName && <h2>Videos from {channelName}</h2>}
             <div className="videos">
                {video.map(video=> (
                    <div key={video.guid} className="videos__item">
                    <div className="video__image">
                        <a targe="__blank" href={video.link}>
                            <img src={`https://i4.ytimg.com/vi/${video.guid.split(':')[2]}/mqdefault.jpg`}/> 
                        </a>
                    </div>
                    <div className="video__footer">
                        <p>{video.title}</p>
                    </div>
                </div>
                    
                ))}
             </div>
        </div>
       
    );
};
//img src를 그냥 thumbnail에서 가져오지 않은 이유는 high-quality이고, 검정 배경이어서