var config = require('../src/conf/config.js');
var logger = require('log'), log = new logger(config.logger.level);
var ip = require('ip');
var os = require('os');
var crypto = require('crypto');

module.exports = {
	api_host: function api_host() {
		//log.debug('api_host: %s - %s - %s - %s', process.env.IP, process.env.OPENSHIFT_NODEJS_IP, ip.address(), process.env.C9_HOSTNAME);
		return process.env.C9_HOSTNAME || ip.address() || process.env.IP || process.env.OPENSHIFT_NODEJS_IP;
	},

	api_port: function api_port() {
		//log.debug('api_port: %s - %s - %s - %s', process.env.NODE_PORT, process.env.PORT, process.env.OPENSHIFT_NODEJS_PORT, config.server.default_port);
		return process.env.NODE_PORT || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || config.server.default_port;
	},

	api_protocol: function api_protocol() {
		return (process.env.C9_HOSTNAME) ? 'https' : 'http';
	},

    api_domain: function api_domain() {
   		if(process.env.C9_HOSTNAME) {
			return this.api_protocol() + '://' + this.api_host() + '/api';
   		} else {
			return this.api_protocol() + '://' + this.api_host() + ":" + this.api_port() + '/api';
   		}
	},

	dump_env: function dump_env() {
		log.info('>> local ip address: %s', ip.address());
		log.info('>> local domain: %s', this.api_domain());
		log.info('>> host name: %s running on os "%s", platform "%s"', os.hostname(), os.type(), os.platform());
		log.info('>> CPU: "%s", release "%s", uptime: "%s", load: "%s"', os.arch(), os.release(), os.uptime(), os.loadavg())
	},
	
	sleep: function sleep(millis, callback) {
    	setTimeout(function() {
    		callback();
    	}, millis);
	},
	
	sleepSync: function sleepSync(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	},

	hash: function hash(value) {
		//log.info("hash function receives: %s", value);
		return crypto.createHash('sha1').update(value).digest('hex');
	}, 
}
