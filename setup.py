import os
import socket
import subprocess

print("Installing Diesel")
subprocess.call("cargo install diesel_cli --no-default-features --features postgres".split(" "))

localhost = socket.gethostbyname("127.0.0.1")
rust_port = 8088

for port in range(8000,9000):  
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex((localhost, port))
    if result == 0:
        # print(f"Port {port}: Open")
        sock.close()
        rust_port = port
        break

db_name = input("Enter App Database Name: ")
db_user = input("Enter App Database Username: ")
db_password = input("Enter App Database Password: ")

try:
    dot_env = open(".env", "w")
    env_contents = f"DATABASE_URL=postgres://{db_user}:{db_password}@localhost/{db_name}\nRUST_SPA_PORT={rust_port}"
    dot_env.write(env_contents)
except:
    print(f"Failed to write .env contents.")

subprocess.call(f"sudo python3 setup_nginx.py {rust_port}".split(" "))