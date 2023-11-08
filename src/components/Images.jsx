import React from "react";

function Images(props) {
  const publicImage = `/images/`;

  const { src, alt, img2, img3, styles } = props;
  
  const source = src.includes('http')

  return (
    <img
      className={styles}
      src={source?src:`${publicImage}${src}`}
      alt={alt}
      srcSet={source?src:`${publicImage}${src} 1x, ${publicImage}${img2} 2x, ${publicImage}${img3} 3x`}
    />
  );
}

export default React.memo(Images);
