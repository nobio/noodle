#!/usr/bin/env node
var config = require('../../src/conf/config.js');
var logger = require('log'), log = new logger(config.logger.level);
var util = require('../util');

var express = require('express');
var router = express.Router();
var persistence = require('../persistence');

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

/*
 * create a new noodle
 *
 * curl -X POST -H "Content-Type: application/json" http://localhost:30000/noodle -d '{"title": "myNewNoodle", "location":"hinterm Bahnhof","description": "Wichtiges Admintreffen","admin_name": "Gernot H. Reichel","admin_mail":  "gernot@wichtigemail.com"}'
 */
router.post('/noodle', function(req, res) {
	log.debug(req.body.event);
	persistence.createNoodle(req.body, function(err, noodle) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(noodle);
		}	
	});
});

/*
 * update an existing noodle
 */
router.put('/noodle', function(req, res) {
	res.send(200);
});

/*
 * delete a noodle
 */
router.delete('/noodle', function(req, res) {
	res.send(200);
});

/*
 * read a noodle
 */
router.get('/noodle', function(req, res) {
	res.send(200);
});

/*
 * find a list of noodles regarding filter criteria
 */
router.get('/noodles', function(req, res) {
	res.send(200);
});


router.get('/test', function(req, res) {
	log.debug("process %s is sleeping for 5000 ms...", process.pid);
	for (var i = 0; i < 10; i++) {
		util.sleep(1000, function() {
			log.debug(process.pid, +" "+i);			
			console.log(process.pid +" "+ i);			
		});	
	}
	res.send(200);
});