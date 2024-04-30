1.
The directory "Task1" contains the solution for problem 1, or rather, what I had time to implement.

It is an app which stores a list of houses (id, city and street address), and gas and electricity data for each house.
I did not have time to implement adding a new house/gas/electricity data,  search, nor to check if city+street combinations are unique.

To run the app, you will need 2 potgresql datatables:
 - Houses (columns: primary key serial id, character(255) non-nullable city and character(255) non-nullable street)
 - Utilities (columns: primary key serial id, character(255) type (electricity or gas), non-nullable numeric readingValue, non-nullable date  date, non-nullable integer house_id - id from the House table))
   
You will also need an .env file in the folder Task1/backend with the data necessary to connect to the db:
USER=,
DATABASE=,
PASSWORD=,
PORT=

Please, run backend with the command " node --env-file=.env app ". It runs on localhost:4000

The frontend can be run with the standard for react dev "npm start" on localhost:3000

2. The directory "Task2" contains a single file solution.sql, which is a query that will produce the desired result
