import { useState } from "react";
import { Trash, TrashFill } from 'react-bootstrap-icons';

const DeleteButton = ({onClick}) => {
  const [deleteHover, setDeleteHover] = useState(false);
  return(
    <h3 onClick={onClick} onMouseEnter={()=> setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)}><span title="delete">{deleteHover ? <TrashFill/> : <Trash/>}</span></h3>
  )
}

export default DeleteButton