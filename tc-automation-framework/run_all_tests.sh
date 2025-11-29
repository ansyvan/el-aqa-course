#!/bin/bash

generate_report() {
    echo "Generating Allure report..."
    npm run allure-report
}

echo "Full testing in progress..."

echo "Cleaning up previous test results..."
rm -rf allure-results
rm -rf allure-report

echo "Running database tests..."
npm run test-database

echo "Running API tests..."
npm run test-api

echo "Running UI tests..."
npm run e2e

generate_report

echo "All tests completed."
