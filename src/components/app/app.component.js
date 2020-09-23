import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FormCondition from '../form-condition/form-condition.component';
import { fields, operators } from '../../app.config';
import {
  defaultCondition,
  getCondition,
  getSQLFromConditions,
} from '../../shared/libs/utils';
import styles from './app.module.scss';

export default function App() {
  const [conditions, setConditions] = useState([defaultCondition]);
  const [sqlResults, setSqlResults] = useState('');
  const [sqlError, setSqlError] = useState(false);
  const onConditionRemoveClicked = (i) => {
    let newConditions;
    if (i === 0 && conditions.length === 1) {
      newConditions = [getNextCondition()];
    } else {
      newConditions = conditions.filter((_, idx) => idx !== i);
    }
    setConditions(newConditions);
  };
  const onConditionUpdate = (i, updatedCondition) => {
    const newConditions = [...conditions];
    newConditions[i] = {
      ...newConditions[i],
      ...updatedCondition,
    };
    setConditions(newConditions);
  };
  const onSearchClicked = () => {
    try {
      setSqlResults(getSQLFromConditions(conditions));
      setSqlError(false);
    } catch (e) {
      setSqlError(e.message);
      setSqlResults('');
    }
  };
  const onResetClicked = () => {
    setConditions([getNextCondition()]);
  };
  const addCondition = () => {
    setConditions([...conditions, getNextCondition()]);
  };
  const getNextCondition = () => {
    const conditionsKeys = conditions.slice().map(({ key }) => key);
    const availableFields = fields.filter(
      (field) => !conditionsKeys.includes(field.key)
    );
    if (!availableFields.length) {
      return null;
    }
    const nextField = availableFields.shift();
    const nextOperator = operators[nextField.type].slice().shift();
    return getCondition(nextField, nextOperator);
  };
  const getAvailableFields = () => {
    const conditionsKeys = conditions.slice(0, -1).map(({ key }) => key);
    return fields.filter((field) => !conditionsKeys.includes(field.key));
  };
  const canAddFields = () => conditions.length < fields.length;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for Sessions</h1>
      <div className={styles['rows-container']}>
        <div className={styles.rows}>
          {conditions.map((condition, i) => (
            <FormCondition
              key={condition.id}
              className={styles['condition-container']}
              availableFields={getAvailableFields()}
              condition={condition}
              onConditionUpdate={(updatedCondition) =>
                onConditionUpdate(i, updatedCondition)
              }
              onRemove={() => onConditionRemoveClicked(i)}
            />
          ))}
        </div>
        {canAddFields() ? (
          <button
            className={styles['add-button']}
            onClick={() => addCondition()}
          >
            Add
          </button>
        ) : (
          ''
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles['footer-actions']}>
          <button className={styles.search} onClick={() => onSearchClicked()}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            Search
          </button>
          <button className={styles.reset} onClick={() => onResetClicked()}>
            Reset
          </button>
        </div>
        {sqlError === '' ? '' : <p className={styles.error}>{sqlError}</p>}
        {sqlResults === '' ? (
          ''
        ) : (
          <code className={styles.results}>{sqlResults}</code>
        )}
      </footer>
    </div>
  );
}
