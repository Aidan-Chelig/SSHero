module.exports = {
	port: 22,
	ssh2: {
		keys: ['./keys/host.key', './keys/other.key'],
		algorithms: {
			kex: ['ecdh-sha2-nistp256',
				'ecdh-sha2-nistp384',
				'ecdh-sha2-nistp521',
				'diffie-hellman-group-exchange-sha256',
				'diffie-hellman-group14-sha1',
				'diffie-hellman-group-exchange-sha1',
				'diffie-hellman-group1-sha1'],
			cipher: ['aes128-ctr',
				'aes192-ctr',
				'aes256-ctr',
				'aes128-gcm',
				'aes128-gcm@openssh.com',
				'aes256-gcm',
				'aes256-gcm@openssh.com',
				'aes256-cbc',
				'aes192-cbc',
				'aes128-cbc'],
			serverHostKey: [ 'ssh-rsa', 'ssh-dss'],
		}
	},
	redisoptions: {
        host: '127.0.0.1',
        port: 6379
	},
	netoptions: {
		port: 25531,
		host: '127.0.0.1'
	}
};
