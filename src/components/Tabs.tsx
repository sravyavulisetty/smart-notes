import React, { useState } from 'react'

interface Tabs{
    tabs: {
        name: string;
        content: React.ReactElement;
    }[]
}

const Tabs = ({tabs}: Tabs) => {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='tabs-container'>
     <div className='tabs-header'> 
      {tabs.map((tab,i) => (
        <p 
        key={i}
        className={`tab-item ${activeIndex === i ? 'active' : ''}`}
        onClick={()=>setActiveIndex(i)}>{tab.name}</p>
      ))}
      <div
          className="tab-indicator"
          style={{
            transform: `translateX(calc(100% * ${activeIndex}))`,
          }}
        ></div>
      </div>
      <div>{tabs[activeIndex].content}</div>
    </div>
  )
}

export default Tabs
