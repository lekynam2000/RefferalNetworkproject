import React, { useState } from 'react';

function Popup({ trigger, children }) {
  const [show, toggleShow] = useState(false);
  return show ? (
    children
  ) : (
    <div
      className='trigger-wrapper'
      onClick={() => {
        toggleShow(!show);
      }}
    >
      {trigger}
    </div>
  );
}

export default Popup;
