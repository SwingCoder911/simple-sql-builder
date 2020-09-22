import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FormCondition from '../form-condition/form-condition.component';
import { fields } from '../../app.config';
import { defaultCondition } from '../../shared/libs/utils';
import styles from './app.module.scss';

export default function App() {
  const [conditions, setConditions] = useState([defaultCondition]);
  const onConditionRemoveClicked = (i) => {
    if (i === 0 && conditions.length === 1) {
      setConditions([defaultCondition]);
      return;
    }
    const newConditions = conditions.slice();
    newConditions.splice(i, 1);
    setConditions(newConditions);
  };
  const onConditionUpdate = (i, updatedCondition) => {
    const newConditions = conditions.slice();
    if (!newConditions.length) {
      newConditions.push(updatedCondition);
      setConditions(newConditions);
      return;
    }
    newConditions[i] = {
      ...newConditions[i],
      ...updatedCondition,
    };
    setConditions(newConditions);
  };
  const addCondition = () => {
    setConditions([...conditions, defaultCondition]);
  };
  const getAvailableFields = () => {
    return fields;
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for Sessions</h1>
      <div className={styles['rows-container']}>
        <div className={styles.rows}>
          {conditions.map((condition, i) => (
            <FormCondition
              className={styles['condition-container']}
              key={i}
              availableFields={getAvailableFields()}
              condition={condition}
              onConditionUpdate={(updatedCondition) =>
                onConditionUpdate(i, updatedCondition)
              }
              onRemove={() => onConditionRemoveClicked(i)}
            />
          ))}
        </div>
        <button className={styles['add-button']} onClick={() => addCondition()}>
          Add
        </button>
      </div>
      <footer className={styles.footer}>
        <div className={styles['footer-actions']}>
          <button className={styles.search}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            Search
          </button>
          <button className={styles.reset}>Reset</button>
        </div>
        <code className={styles.results}>Test code here</code>
      </footer>
    </div>
  );
}
