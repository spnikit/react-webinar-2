import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onClick: useCallback(() => {
      props.onButtonClick(props.item.code);
    }, [props.onButtonClick, props.item])
  };

  return (
    <div className={cn({selected: props.item.selected})}>
      <div className={cn('number')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      {props.cartItem && (
        <div className={cn('amount')}>{props.item.amount} шт</div>
      )}
      <div className={cn('actions')}>
        <button onClick={callbacks.onClick}>
          {props.cartItem ? 'Удалить' : 'Добавить'}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
};

export default React.memo(Item);
