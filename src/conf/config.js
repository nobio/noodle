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
		"url": "mongodb://event:QHH-qeG-mAS-4sK@ds029901.mongolab.com:29901/event",
		"path_to_db": "./data",
		"flush_interval": "5000"
	}
};

//http://www.iana.org/assignments/multicast-addresses/multicast-addresses.xhtml