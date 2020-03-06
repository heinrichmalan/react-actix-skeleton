#!/bin/bash
PORT=$(awk -F'=' '/RUST_SPA_PORT=([0-9]+)/ { print $2 }' .env)
systemfd --no-pid -s http::$PORT -- cargo watch -x run