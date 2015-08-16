#!/usr/bin/env node
var config = require('..//src/conf/config.js');
var logger = require('log'), log = new logger(config.logger.level);
var assert = require("assert");
var util = require("../src/util");

describe('#ping()', function() {
	it('sync ping should return no return value', function(done) {
		var httpcode = udpClient.ping();
		assert.equal(undefined, httpcode);
		done();
	});
	
	it('async ping should return return no error (code=200)', function(done) {
		udpClient.ping(function(err) {
			assert.equal(undefined, err);
			done();
		});
	});
});
		
