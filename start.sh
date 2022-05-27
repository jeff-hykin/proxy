ssh -L 7701:localhost:7700 -f -N jeffhykin@192.168.192.201
./target/debug/proxy ./server_config.toml