REPORTER = spec

all: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

jshint:
	jshint lib examples test js-miner.js

tests: test

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive -R xunit > results.xml --timeout 3000

skel:
	mkdir examples lib test
	touch js-miner.js
	npm install mocha chai --save-dev

.PHONY: test tap unit jshint skel