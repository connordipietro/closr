import { useState } from "react";
import { Safe, SafeFill } from 'react-bootstrap-icons';

const ArchiveButton = ({onClose}) => {
  const [archiveHover, setArchiveHover] = useState(false);
  return(
    <h3 onClick={onClose} onMouseEnter={()=> setArchiveHover(true)} onMouseLeave={() => setArchiveHover(false)}><span title="archive">{archiveHover ? <SafeFill/> : <Safe/>}</span></h3>
  )
}

export default ArchiveButton