import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'
import EduSourceCard from 'src/ui-component/edusource/edusourcecard';
import CollectionCard from 'src/ui-component/edusource/collectioncard';

const Item = ({ edusource, collection }) => (

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
          {edusource?<>
          <EduSourceCard edusource = {edusource} />
          </>:<>
          <CollectionCard collection = {collection} />
          </>}      
     
          
          {/* <img src={edusource.image} alt="" /> */}
         
          {/* <ShowDetailsButton onClick={() => onSelectSlide(edusource)} /> */}
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
