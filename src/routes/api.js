#!/usr/bin/env node
var config = require('../../src/conf/config.js');
var logger = require('log'), log = new logger(config.logger.level);

var express = require('express');
var router = express.Router();

module.exports = router;

/* Here goes the API */

/** 
 * receives an event to store in persistence layer 
 * curl -X POST -H "Content-Type: application/json" -d '{"event": { "header": { "application_id":"calvin_de", "event_type":"cash-transfer", "source_host": "10.207.131.20"}, "payload": {"data": "<request>MWOrdAdd</request>"}}}' http://localhost:8080/api/event
 */
/*
router.post('/event', function(req, res) {
	eventHandler.storeEvent(req.body, function(err) {
		if(err) {
			res.send(500, err.message);
		} else {
			res.send(200);
		}
	});
});
*/