# tc-framework
Automated testing framework for the Automation TC 2021.

## INSTALLATION:
* Install [node LTS] (https://nodejs.org/en/download/);
* Clone the project locally;
* In project root directory run:
```
npm install
```

## RUNNING THE API TESTS:
* To see full debug log - LOG_LEVEL=debug
* Ensure that all required env variabled were added to .env file
* Perform full clean run of API tests with the the following command:
```
npm test
```

* Run individual integration test with following command:
```
./node_modules/.bin/mocha --config=./api/test/regression.mocharc.json api/test/Starships_tests/starship-crud.test.js
```

## RUNNING THE e2e TESTS:
```
SPEC_NAME=ui/test/Swapi_tests/sendSwapiRequestTest.js npm run e2e
```
Additionally, the following env variables are available
* LOG_LEVEL=debug - specify log level for REST requests and wdio commands
* SPEC_NAME=ui/test/Swapi_tests/sendSwapiRequestTest.js - specify test file
* BROWSER_NAME=chrome - specify browser name, available options: chrome; firefox
* BROWSER_ARGS=disable-infobars - specify additional browser args
* SPEC_FILE_RETRIES=0 - specify number of retries for the suite

## Using proxy:
Set the following env variables in .env file:
* USE_PROXY=true - enable proxying
* PROXY_PORT=8090 - proxy server port
* PROXY_HOST=localhost - proxy server host