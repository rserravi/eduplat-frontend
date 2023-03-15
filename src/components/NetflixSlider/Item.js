import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'
import EduSourceCard from 'src/ui-component/edusource/edusourcecard';

const Item = ({ edusource }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === edusource.key;

      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        > 
        <div className='card'>
        <EduSourceCard 
          title={edusource.title} 
          autor={edusource.autor}
          autorAvatar={edusource.autorAvatar} 
          date={edusource.date} 
          discipline={edusource.discipline} 
          extract={edusource.extract}
          image={edusource.image}
          labels={edusource.labels}
        />
        </div>
          
          {/* <img src={edusource.image} alt="" /> */}
         
          {/* <ShowDetailsButton onClick={() => onSelectSlide(edusource)} /> */}
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
