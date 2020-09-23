export const fields = [
  {
    label: 'User Email',
    key: 'user_email',
    type: 'string',
    defaultValue: 'user@email.com',
  },
  {
    label: 'Screen Width',
    key: 'screen_width',
    type: 'number',
    defaultValue: 42,
  },
  {
    label: 'Screen Height',
    key: 'screen_height',
    type: 'number',
    defaultValue: 42,
  },
  { label: '# of Visits', key: 'visits', type: 'number', defaultValue: 42 },
  {
    label: 'First Name',
    key: 'user_first_name',
    type: 'string',
    defaultValue: 'Bruce',
  },
  {
    label: 'Last Name',
    key: 'user_last_name',
    type: 'string',
    defaultValue: 'Wayne',
  },
  {
    label: 'Page Response time (ms)',
    key: 'page_response',
    type: 'number',
    defaultValue: 42,
  },
  {
    label: 'Domain',
    key: 'domain',
    type: 'string',
    defaultValue: 'batman-news.com',
  },
  {
    label: 'Page Path',
    key: 'path',
    type: 'string',
    defaultValue: 'path/to/page',
  },
];

const baseOperators = {
  equals: {
    key: 'equals',
    defaultValue: 42,
    getClause: (column, value) => `${column}='${value}'`,
  },
  'in list': {
    key: 'in list',
    defaultValue: 'first,second,third',
    getClause: (column, list) =>
      `${column} IN ('${list.split(',').join("','")}')`,
  },
};

export const operators = {
  string: [
    baseOperators.equals,
    {
      key: 'contains',
      defaultValue: 'text',
      getClause: (column, value) => `${column} LIKE '%${value}%'`,
    },
    {
      key: 'starts with',
      defaultValue: 42,
      getClause: (column, value) => `${column} LIKE '${value}%'`,
    },
    baseOperators['in list'],
  ],
  number: [
    baseOperators.equals,
    {
      key: 'between',
      defaultValue: [0, 42],
      getClause: (column, min, max) => `${column} BETWEEN ${min} and ${max}`,
    },
    {
      key: 'greater than',
      defaultValue: 42,
      getClause: (column, value) => `${column}>'${value}'`,
    },
    {
      key: 'less than',
      defaultValue: 42,
      getClause: (column, value) => `${column}<'${value}'`,
    },
    baseOperators['in list'],
  ],
};
