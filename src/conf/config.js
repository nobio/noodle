module.exports = {
	"server": {
		"default_port": "30000"
	},
	"logger": {
		"api": "logs/api.log",
		"exception": "logs/exceptions.log",
		"level": "debug"
	},
	"persistence": {
		"url": "mongodb://noodle:Zdd-HP2-rtS-5Bq@dbh85.mongolab.com:27857/noodle",
		"path_to_db": "./data",
		"flush_interval": "5000"
	}
};

//http://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml