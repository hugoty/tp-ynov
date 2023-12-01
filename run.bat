@echo off
start cmd /k "cd account-service && node app.js"
start cmd /k "cd client-service && node app.js"
start cmd /k "cd transaction-service && node app.js"
start cmd /k " node app.js"
