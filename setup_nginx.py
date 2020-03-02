import os
import sys
import subprocess

if __name__ == "__main__":
    args = sys.argv
    rust_port = args[1]
    site_port = input("Please enter the port to use for the website (default 80): ")

    try:
        site_port = site_port.strip()
        if site_port == "":
            site_port = "80"
        else:
            site_port = str(int(site_port))

    except ValueError:
        print("Error: Site Port must be an integer.")
    
    cwd = os.getcwd()


    # print(site_port)

    web_root = f"{cwd}/frontend/build"
    rust_port = str(rust_port)

    nginx_server_config = open("nginx_server_template")

    contents = nginx_server_config.read()
    formatted_contents = contents
    formatted_contents = formatted_contents.replace("{site_port}", site_port)
    formatted_contents = formatted_contents.replace("{web_root}", web_root)
    formatted_contents = formatted_contents.replace("{rust_port}", rust_port)


    # print(formatted_contents)
    try:
        nginx_config = open("/etc/nginx/sites-available/rust_spa", "w")
        nginx_config.write(formatted_contents)
    except Exception as e:
        print(e)
        print(f"Failed to write NGINX config. Directory could not be accessed. Try running as superuser.")

    return_code = subprocess.call(f"ln -s -f /etc/nginx/sites-available/rust_spa /etc/nginx/sites-enabled/rust_spa".split(" "))

    if return_code:
        print("Failed to create symlink for nginx server file.")
        exit()

    return_code = subprocess.call("sudo nginx -t".split(" "))

    if return_code:
        print("Error with nginx server file.")
        exit()