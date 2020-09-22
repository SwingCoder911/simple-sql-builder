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

export const operators = {
  string: ['equals', 'contains', 'starts with', 'in list'],
  number: ['equals', 'between', 'greater than', 'less than', 'in list'],
};
