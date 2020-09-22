import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './select.module.scss';

export default function Select({
  options,
  defaultValue,
  onChange,
  className = '',
}) {
  const [selected, setSelected] = useState(defaultValue);
  const [expanded, setExpanded] = useState(false);
  if (!options.length) {
    console.log('no options provided to select');
    return '';
  }
  const handleClickedAway = (e) => {
    if (e.target.closest(`.${styles.container}`) !== null) {
      return;
    }
    setExpanded(false);
    stopListeningForClickAway();
  };
  const listenForClickAway = () => {
    document.addEventListener('click', handleClickedAway);
  };
  const stopListeningForClickAway = () => {
    document.removeEventListener('click', handleClickedAway);
  };
  const onToggleClicked = () => {
    if (!expanded) {
      listenForClickAway();
    } else {
      stopListeningForClickAway();
    }
    setExpanded(!expanded);
  };
  const onItemClicked = (option) => {
    setSelected(option);
    onChange(option);
    setExpanded(false);
  };
  const getButtonIcon = () => (expanded ? faChevronUp : faChevronDown);
  const getItemClass = (option) =>
    option.key === selected.key ? [styles.item, styles.selected] : styles.item;
  return (
    <div className={classNames(styles.container, className)}>
      <button className={styles.initial} onClick={() => onToggleClicked()}>
        <span className={styles.label}>{selected.label}</span>
        <FontAwesomeIcon icon={getButtonIcon()} className={styles.icon} />
      </button>
      {expanded ? (
        <ul className={styles.selectable}>
          {options.map((option, i) => (
            <li
              className={classNames(getItemClass(option))}
              key={i}
              onClick={() => onItemClicked(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}
