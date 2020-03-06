import os
import platform
import socket
import subprocess

print("Installing node packages")
subprocess.call("npm install --prefix ./frontend".split(" "))

print("Installing Diesel")
subprocess.call(
    "cargo install diesel_cli --no-default-features --features postgres".split(" "))

localhost = socket.gethostbyname("127.0.0.1")
rust_port = 8100

for port in range(8100, 9000):
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
    dot_env.close()
except:
    print(f"Failed to write .env contents.")

print("Setting up DB")

subprocess.call("diesel setup".split(" "))

if platform.system() != "Windows":
    subprocess.call(f"sudo python3 setup_nginx.py {rust_port}".split(" "))
else:
    subprocess.call(f"python3 setup_nginx.py {rust_port}".split(" "))
