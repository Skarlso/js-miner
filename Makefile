REPORTER = spec

all: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/jest --coverage --verbose --runInBand

tests: test

skel:
	mkdir examples lib test
	touch js-miner.js
	npm install jest --save-dev

.PHONY: test tap unit jshint skel