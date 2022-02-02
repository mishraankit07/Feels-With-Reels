import React from 'react';
import ReactDOM from 'react-dom';

function Video(props) {

  let handleVideoClick=(e)=>{
    //e.preventDefault();
    e.target.muted=!e.target.muted;
  }

  let handleVideoEnd=(e)=>{
    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted=true;
    }
  }


  return (
  <video src={props.src} muted="muted" controls className="video-style" onEnded={handleVideoEnd} onClick={handleVideoClick}></video>
  );
}

export default Video;
