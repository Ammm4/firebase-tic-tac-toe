import React from 'react';

const Button = ({sendRequest}) => {
  return (
    <button onClick={()=> sendRequest()}>Invite</button>
  )
}

export default Button;