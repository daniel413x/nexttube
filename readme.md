
~~~ ./client ~~~

Set the following variable(s):

NEXT_PUBLIC_API_URL

Start the client server:

npm start

~~~ ./server ~~~

Set the following variable(s) as needed by the environment:

NODE_ENV
PORT
JWT_KEY
DEV_DB_USERNAME
DEV_DB_PASSWORD
DEV_DB_NAME
DEV_DB_HOSTNAME
DEV_DB_PORT
TEST_DB_USERNAME
TEST_DB_PASSWORD
TEST_DB_NAME
TEST_DB_HOSTNAME
TEST_DB_PORT
PROD_DB_USERNAME
PROD_DB_PASSWORD
PROD_DB_NAME
PROD_DB_HOSTNAME
PROD_DB_PORT

Execute migrations and seeders with the following command:

npm run migration:generate:run:seed

Start the server:

npm run start:dev
