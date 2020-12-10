import React, { useEffect } from 'react';
import Level2 from './Level2';

export default (props) => {
  const [showSubmenu, setShowSubmenu] = React.useState(false)
  useEffect(() => {
    if(showSubmenu) {
      // const body = document.getElementsByTagName("BODY")[0];
      // body.style.overflow = 'hidden';
      if (props.index > 2 && props.index < 9) {
        const subMenuTitle = document.getElementsByClassName('level1-name')[props.index]
        const subMenu = document.getElementsByClassName('level1-subMenu')[props.index];
        const calculatedLeftOfSubmenu = (subMenu.offsetWidth / 2) - (subMenuTitle.offsetWidth / 2) - 200;
        subMenu.style.left = `-${calculatedLeftOfSubmenu}px`;
      }
      if (props.index > 8) {
        const subMenuTitle = document.getElementsByClassName('level1-name')[props.index]
        const subMenu = document.getElementsByClassName('level1-subMenu')[props.index];
        const calculatedLeftOfSubmenu = subMenu.offsetWidth - subMenuTitle.offsetWidth;
        subMenu.style.left = `-${calculatedLeftOfSubmenu}px`;
      }
    } else {
      // const body = document.getElementsByTagName("BODY")[0];
      // body.style.overflow = 'auto';
    }
  },[showSubmenu])

  function renderChildren(data) {
    return data.map((item, index) => {
        return (
          <li key={index} className="level1-subMenu-item">
            <Level2 hideMenu={() => setShowSubmenu(false)} onClickHideMenu={() => setShowSubmenu(false)} data={item} />
          </li>
        )
        })
  }
  return (
    <>
      <div className="level1-container">
      <div 
          className={showSubmenu ? 'isActive level1-name' : 'level1-name' }
          onMouseEnter={() => setShowSubmenu(true)} 
          onMouseLeave={()=> setShowSubmenu(false)}>
          <div>{props.mainMenuItem.name}</div>
      </div>
      <div 
      className="level1-subMenu-container"
      onMouseEnter={() => setShowSubmenu(true)} 
      onMouseLeave={()=> setShowSubmenu(false)}>
        <ul  
          className={showSubmenu && props.mainMenuItem.subCategories.length > 0 ? "level1-subMenu" : "level1-subMenu-hide level1-subMenu"}
          >
            {props.mainMenuItem.subCategories.length > 0 ? renderChildren(props.mainMenuItem.subCategories) : null}
        </ul>

      </div>
      </div>
      </>
  )
}