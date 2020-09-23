# simple-sql-builder

Simple UI SQL builder for interview project

## Setup

- install `npm install`
- start `npm start`

## Requirements

- track time
- SQL query should be generated in the space indicated below of the mockup once the "Search" button is clicked
- Match the styling in the mockup: https://projects.invisionapp.com/share/F5VLVND7QRP#/screens/401097006
- Implement all features in functionality description
  - Clicking 'X' on the rows should remove a row
  - Clicking 'X' on the first row should just reset that first row
  - Clicking 'Reset' should clear all search criteria
  - Once valid search is submitted, SQL should appear in box as shown in mockup.
- Bonus points:
  - Make the select drop downs look exactly like the mockup
  - Add animations

## Table Schema

Session:
id, user_email, user_first_name, user_last_name, screen_width, screen_height, visits, page_response, domain, path

## Time building things

- Wrapping content: 25 minutes
- Form rows: 7.25 hours
- Sql builder: 1 hour

## Approach

I decided to go the route where the entire list of "conditions" would be held in the state of the root app. The editing would be done inside each of the form rows, but the state would be stored in the root app. This provided for simple downward flow of data and upward flow of updates.

### Place I got stuck:

I got inordinately stuck with maintaining the list appropriately. I learned about React's list rendering and how important the "key" is to the renderer. Specifically I got stuck in the loop of using the index of the array as the key to the item. So when I removed items from the list, the list just did not render the way I expected. When I created my own method of "id" maintenance, everything worked fine. The reason this took me so long to debug ( like 4 hours ) was 2 fold. The intial error just looked like state not changing when I would update it, and the wrong items being deleted when I would delete. I tried different mechanisms of handling the key that didn't work until I found the one that did. I went through several red herrings until I found the issue. I'm not pleased how long it took me to get there, but I got there.

## Known issues:

- Previous "Edit" forms' field lists don't update as you add more items. Every previous row maintains the same number of fields in the list.
  - This is a deeper issue with rendering. If I were to attack this in the future, I would probably maintain state in the root component of used keys, pass that down to each form item and let each form calculate it's own new new selectable list. This has code smell to it though, so I might consider using redux or some other bigger solution for this.
