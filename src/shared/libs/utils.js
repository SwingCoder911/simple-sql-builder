import { fields, operators } from '../../app.config';
const defaultField = fields[0];
const defaultOperator = operators[defaultField.type][0];
export const getCondition = (
  condition,
  operator = defaultOperator,
  value = ''
) => ({
  ...condition,
  operator,
  value,
});
export const defaultCondition = getCondition(defaultField);
