import React from 'react';

const Square = ({squareStyle, clickhandler}) => (

<div className={squareStyle? squareStyle: 'square'} onClick={clickhandler}></div>

)



export default Square;