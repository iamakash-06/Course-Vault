import React, { useState } from 'react';
import '../styles/Slide.scss';
import Student from './Student';
import Faculty from './Faculty';
import Admin from './Admin';


function FlexSlide({ title, about }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex-slide"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex-title" style={{ transform: isHovered ? 'rotate(0deg)' : 'rotate(90deg)', top: isHovered ? '10%' : '15%' }}>
        {title}
      </div>
      <div className="flex-about" style={{ opacity: isHovered ? 1 : 0 }}>
        <p>{about}</p>
      </div>
    </div>
  );
}


function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  const handleImagesLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex-container">
      <div className="flex-slide home">
       <Student />
      </div>
      <div className="flex-slide about">
       <Faculty />
      </div>
      <div className="flex-slide work">
        <Admin />
      </div>
    </div>
  );
}

export default Profile;