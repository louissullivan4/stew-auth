#!/bin/sh
if [ "$NODE_ENV" = "test" ]; then
    npm test
else
    npm start
fi