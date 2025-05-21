import React, { useState } from 'react'
import type { LucideIcon } from "lucide-react";

type TooltipProps = {
    content: string;
    icon: LucideIcon;
    size: number;
    onclick: (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const Tooltip = ({content, icon: Icon, size, onclick}: TooltipProps) => {
    let timeout: ReturnType<typeof setTimeout>;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(()=>{
            setActive(true)
        }, 400)
    }

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    }
    
  return (
    <div className='tooltip-wrapper' onMouseEnter={showTip} onMouseLeave={hideTip}>
      <Icon size={size} onClick={onclick}/>
      {active &&
      <div className='tooltip-tip'>{content}</div>}
    </div>
  )
}

export default Tooltip
