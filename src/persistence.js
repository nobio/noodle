var config = require('../src/conf/config.js');
var util = require('./util');
var logger = require('log'), log = new logger(config.logger.level);
var mongoose = require('mongoose');

//===================================== INITIALISATION =====================================//
console.log("init mongodb database");

// Event Model
var Schema   = mongoose.Schema;
var _Noodle = new Schema({
	title:          {type: String, required: true, default: 'unknown', index: true,  unique: false}, 
	location:       {type: String, required: true, default: 'unknown', index: true,  unique: false}, 
	description:    {type: String, required: true, default: 'unknown', index: false, unique: false}, 
	created:        {type: Date,   required: true, default: Date.now,  index: false, unique: false}, 
	admin_name:     {type: String, required: true, default: 'unknown', index: true,  unique: false}, 
	admin_mail:     {type: String, required: true, default: 'unknown', index: false, unique: false},
	url_hash:       {type: String, required: true, default: 'unknown', index: false, unique: false},
	url_hash_admin: {type: String, required: true, default: 'unknown', index: false, unique: false}
});
mongoose.model('Noodle', _Noodle);
var Noodle = mongoose.model('Noodle');


var mongodb_url = config.persistence.url;

var options = {
	db: { native_parser: true },
	server: { poolSize: 2 },
	server: { socketOptions: { keepAlive: 1 } },
	replset: { socketOptions: { keepAlive: 1 } }
}

log.info('connecting to mongodb on %s with options %s', mongodb_url, JSON.stringify(options));
mongoose.connect(mongodb_url, options);
log.info('connected to mongodb');

//===================================== END OF INITIALISATION =====================================//

/* this is a persistence wrapper; may it be linked to a database or just an in-memory db or a map */
module.exports = {
	
	/**
	 * validates the event object and stores it
	 */
	createNoodle: function createNoodle(nd, callback) {
		
		log.debug('creating new Noodle: %s', JSON.stringify(nd));
		new Noodle({
			title: 			nd.title, 
			location:    	nd.location,
			description: 	nd.description,
			admin_name:     nd.admin_name,
			admin_mail:     nd.admin_mail,
			url_hash:       util.hash(nd.admin_mail + new Date().toISOString()),
			url_hash_admin: util.hash(nd.admin_name + new Date().toISOString())
		}).save(function(err, noodle) {
			if(err) {
				callback(err, null);
			} else {
				//log.debug('noodle saved: ' + noodle);
				callback(null, noodle);
			}
		});
	},
	
	loadAll: function(callback) {
		Noodle.find(function(err, events) {
			callback(err, events);
		});
	}
};

