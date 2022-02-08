import React from 'react';
import ReactDOM from 'react-dom';
import './Video.css';

function Video(props) {

  let handleVideoClick=(e)=>{
    //e.preventDefault();
    e.target.muted=!e.target.muted;
  }

  let handleVideoEnd=(e)=>{
    console.log("current element:",ReactDOM.findDOMNode(e.target));

    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(next){
      next.scrollIntoView();
      e.target.muted=true;
    }
  }


  return (
  <video src={props.src} muted="muted" className="video-style" onEnded={handleVideoEnd} onClick={handleVideoClick}></video>
  );
}

export default Video;
