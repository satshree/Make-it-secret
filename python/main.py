__author__ = "Satshree Shrestha"

import os
import sys
import re
from base64 import b64encode, b64decode
from EncryptDecrypt import generatekey, encipher, decipher
from datetime import datetime

SEPARATOR = "\n-----\n"

# GET DESKTOP DIRECTORY
CURR_DIR = os.getcwd().split("\\")
for each in CURR_DIR:
    if each is "Desktop":
        break
    else:
        CURR_DIR.pop()

CURR_DIR.append("Desktop")
DESKTOP = "\\".join(CURR_DIR)

def flush_message(message):
    print(message)
    sys.stdout.flush()

def get_file_name(path):
    if "\\" in path:
        path_split = path.split("\\")
        file_name = path_split.pop()
    elif "/" in path:
        path_split = path.split("/")
        file_name=path_split.pop()
    
    # GET FILE NAME REGARDLESS OF EXTENSION
    return file_name.split(".")[0]

def encrypt(file_name, path):
    with open(path, "br") as binary_file:
        # READ FILE
        read_file = binary_file.read()
        encoded_data = b64encode(read_file)

    # CREATE FILE NAME TO WRITE
    file_name += ".mis"
    file_path = os.path.join(DESKTOP, file_name)
    with open(file_path, "bw") as write_file:
        # WRITE META DATA
        ext = path.split("\\").pop().split(".").pop()
        meta = "{} | Encrypted By Make It Secret, {}\n".format(
            ext,
            datetime.now() 
        )
        write_file.write(encipher(meta, safe_key))

        # WRITE SEPARATOR
        write_file.write(SEPARATOR.encode())

        # ENCRYPT DATA
        enc = encipher(encoded_data.decode("utf-8"), safe_key)

        # WRITE ENCRYPTED DATA
        write_file.write(enc)

def decrypt(file_name, path):
    with open(path, "r") as read_file:
        # READ FILE
        content = read_file.read()

        # READ META INFORMATION
        meta = decipher(content.split(SEPARATOR)[0], safe_key)

        if meta == 0:
            # KEY MISMATCH
            flush_message("WRONG KEY")
            sys.exit(0)
        else:
            # GET ORIGINAL FILE EXTENSION FROM HEADER
            ext = ".{}".format(
                meta.decode("utf-8").split(" | ")[0]
            ) 
            
            # CREATE ORIGINAL FILE NAME
            file_name += ext
            file_path = os.path.join(DESKTOP, file_name)

            # GET FILE CONTENTS
            file_content = content.split(SEPARATOR)[-1].encode()
        
    with open(file_path, "bw") as write_file:
        # DECRYPT DATA
        dec = decipher(file_content.decode("utf-8"), safe_key)

        # WRITE DECRYPTED DATA
        write_file.write(b64decode(dec))

if __name__ == "__main__":
    # INPUT
    user_key = sys.argv[1]
    path = sys.argv[2]
    method = sys.argv[3]

    # FILE NAME TO WRITE
    file_name = get_file_name(path) 

    # KEY
    safe_key = generatekey(user_key)

    if method == "encrypt": 
        # ENCRYPT
        encrypt(file_name, path)
    elif method == "decrypt": 
        # DECRYPT
        decrypt(file_name, path)
    else:
        # ERROR
        sys.exit(0)
    
    # STATUS
    flush_message("DONE")

    # MAKE SURE SCRIPT STOPS
    sys.exit(0)