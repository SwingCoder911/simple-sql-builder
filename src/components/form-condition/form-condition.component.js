import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from '../select/select.component';
import { fields, operators } from '../../app.config';
import {
  defaultCondition,
  getOperatorFromFieldAndKey,
  isConditionBetween,
} from '../../shared/libs/utils';
import styles from './form-condition.module.scss';

const DefaultForm = ({
  getSelectOptionsFromFields,
  onFieldChange,
  currentCondition,
  getSelectOptionsFromOperators,
  onOperatorChanged,
  getCurrentConditionOperator,
  onInputUpdate,
}) => (
  <div className={styles['container-form']}>
    <Select
      className={styles['default-form-item']}
      options={getSelectOptionsFromFields()}
      onChange={(selected) => onFieldChange(selected)}
      defaultValue={getSelectOptionsFromFields()[0]}
    />
    <Select
      className={styles['default-form-item']}
      options={getSelectOptionsFromOperators()}
      onChange={(selected) => onOperatorChanged(selected)}
      defaultValue={getCurrentConditionOperator()}
    />
    <input
      className={classNames(styles['default-form-item'], styles.input)}
      placeholder={currentCondition.defaultValue}
      onKeyUp={(e) => onInputUpdate(e.target.value)}
    />
  </div>
);

const BetweenForm = ({
  getSelectOptionsFromFields,
  onFieldChange,
  currentCondition,
  getSelectOptionsFromOperators,
  onOperatorChanged,
  getCurrentConditionOperator,
  onMinUpdate,
  onMaxUpdate,
}) => (
  <div className={styles['container-form']}>
    <Select
      className={classNames(styles['between-form-item'], styles.select)}
      options={getSelectOptionsFromFields()}
      onChange={(selected) => onFieldChange(selected)}
      defaultValue={currentCondition}
    />
    <span className={styles.filler}>is</span>
    <Select
      className={classNames(styles['between-form-item'], styles.select)}
      options={getSelectOptionsFromOperators()}
      onChange={(selected) => onOperatorChanged(selected)}
      defaultValue={getCurrentConditionOperator()}
    />
    <input
      className={classNames(styles['between-form-input'], styles.input)}
      onKeyUp={(e) => onMinUpdate(e.target.value)}
      placeholder={currentCondition.operator.defaultValue[0]}
    />
    <span className={styles.filler}>and</span>
    <input
      className={classNames(styles['between-form-input'], styles.input)}
      onKeyUp={(e) => onMaxUpdate(e.target.value)}
      placeholder={currentCondition.operator.defaultValue[1]}
    />
  </div>
);
const fieldIndexes = fields.reduce((acc, curr, i) => {
  acc[curr.key] = i;
  return acc;
}, {});

export default function FormCondition({
  className = '',
  availableFields,
  condition = defaultCondition,
  onConditionUpdate,
  onRemove,
}) {
  const onRemoveClicked = (e) => {
    onRemove(e);
  };
  const onFieldChange = (selected) => {
    const field = fields[fieldIndexes[selected.key]];
    const newCondition = {
      ...condition,
      ...field,
    };
    onConditionUpdate(newCondition);
  };

  const onOperatorChanged = (selected) => {
    let newCondition = {
      ...condition,
      operator: getOperatorFromFieldAndKey(condition.type, selected.key),
    };
    if (isConditionBetween(newCondition)) {
      const { defaultValue } = newCondition.operator;
      newCondition = {
        ...newCondition,
        defaultValue,
      };
    } else {
      const defaultValue =
        newCondition.operator.defaultValue === null
          ? newCondition.defaultValue
          : newCondition.operator.defaultValue;
      newCondition = {
        ...newCondition,
        defaultValue,
      };
    }
    onConditionUpdate(newCondition);
  };
  const onMinUpdate = (value) => {
    onConditionUpdate({
      ...condition,
      min: value,
    });
  };
  const onMaxUpdate = (value) => {
    onConditionUpdate({
      ...condition,
      max: value,
    });
  };
  const onInputUpdate = (value) => {
    onConditionUpdate({
      ...condition,
      value,
    });
  };
  const getCurrentConditionOperator = () => ({
    label: condition.operator.key,
    key: condition.operator.key,
  });
  const getSelectOptionsFromFields = () =>
    availableFields.map(({ label, key }) => ({
      label,
      key,
    }));
  const getSelectOptionsFromOperators = () =>
    operators[condition.type].map(({ key }) => ({
      label: key,
      key,
    }));
  return (
    <div className={classNames(styles.container, className)}>
      <button className={styles.remove} onClick={(e) => onRemoveClicked(e)}>
        <FontAwesomeIcon icon={faTimes} className={styles.icon} />
      </button>
      {isConditionBetween(condition) ? (
        <BetweenForm
          currentCondition={condition}
          getSelectOptionsFromFields={getSelectOptionsFromFields}
          onFieldChange={onFieldChange}
          getSelectOptionsFromOperators={getSelectOptionsFromOperators}
          onOperatorChanged={onOperatorChanged}
          getCurrentConditionOperator={getCurrentConditionOperator}
          onMinUpdate={onMinUpdate}
          onMaxUpdate={onMaxUpdate}
        />
      ) : (
        <DefaultForm
          currentCondition={condition}
          getSelectOptionsFromFields={getSelectOptionsFromFields}
          onFieldChange={onFieldChange}
          getSelectOptionsFromOperators={getSelectOptionsFromOperators}
          onOperatorChanged={onOperatorChanged}
          getCurrentConditionOperator={getCurrentConditionOperator}
          onInputUpdate={onInputUpdate}
        />
      )}
    </div>
  );
}
