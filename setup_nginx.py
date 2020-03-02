import os
import platform
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

    windows_default = "C:\\nginx\\conf\\"
    linux_mac_default = "/etc/nginx/"
    print("Setting up NGINX configs")
    os = platform.system()

    nginx_location = input(f"Enter nginx config location (default {linux_mac_default if os != 'Windows' else windows_default}): ")
    
    nginx_location.strip()

    if nginx_location == "":
        nginx_location = linux_mac_default if os != "Windows" else windows_default

    try:
        nginx_config = open(f"{nginx_location}sites-available/rust_spa", "w")
        nginx_config.write(formatted_contents)
    except Exception as e:
        print(e)
        print(f"Failed to write NGINX config. Directory could not be accessed. Try running as superuser.")

    if os == "Windows":
        return_code = subprocess.call(f"mklink /J {nginx_location}sites-available/rust_spa {nginx_location}sites-enabled/rust_spa".split(" "))
    else:
        return_code = subprocess.call(f"ln -s -f {nginx_location}sites-available/rust_spa {nginx_location}sites-enabled/rust_spa".split(" "))

    if return_code:
        print("Failed to create symlink for nginx server file.")
        exit()

    return_code = subprocess.call("nginx -t".split(" "))    

    if return_code:
        print("Error with nginx server file.")
        exit()