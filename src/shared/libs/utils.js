import { fields, operators } from '../../app.config';
const defaultField = fields[0];
const defaultOperator = operators[defaultField.type][0];

export const getCondition = (
  condition,
  operator = defaultOperator,
  value = ''
) => ({
  ...condition,
  id: `${Date.now()}`,
  operator,
  value,
});

export const isConditionBetween = (condition) =>
  condition.operator.key === 'between';

export const defaultCondition = getCondition(defaultField);

export const getOperatorFromFieldAndKey = (type, search) => {
  const filtered = operators[type].filter(({ key }) => key === search);
  if (!filtered.length) {
    return null;
  }
  return filtered[0];
};

export function getSQLFromConditions(conditions) {
  const columnNames = [],
    clauses = [];
  conditions.forEach((condition) => {
    columnNames.push(condition.key);
    if (isConditionBetween(condition)) {
      if (
        isNaN(condition.min) ||
        condition.min === '' ||
        isNaN(condition.max) ||
        condition.max === ''
      ) {
        throw new Error(
          `min and max values need to be numerical for ${condition.key}`
        );
      }

      if (parseFloat(condition.min) >= parseFloat(condition.max)) {
        throw new Error(`min must be smaller than max for ${condition.key}`);
      }
      clauses.push(
        condition.operator.getClause(
          condition.key,
          condition.min,
          condition.max
        )
      );
    } else {
      if (condition.value === '') {
        throw new Error(`${condition.key} must not be an empty value`);
      }
      clauses.push(
        condition.operator.getClause(condition.key, condition.value)
      );
    }
  });
  return `SELECT ${columnNames.join(',')} FROM session WHERE ${clauses.join(
    ' AND '
  )};`;
}
