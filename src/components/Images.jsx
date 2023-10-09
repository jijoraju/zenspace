import React from "react";

function Images(props) {
  const publicImage = `/images/`;

  const { src, alt, img2, img3, styles } = props;
  return (
    <img
      className={styles}
      src={`${publicImage}${src}`}
      alt={alt}
      srcSet={`${publicImage}${src} 1x, ${publicImage}${img2} 2x, ${publicImage}${img3} 3x`}
    />
  );
}

export default React.memo(Images);
