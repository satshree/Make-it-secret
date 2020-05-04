__author__ = "Satshree Shrestha"

import os
import sys
from base64 import b64encode, b64decode
from EncryptDecrypt import generatekey, encipher, decipher
from datetime import datetime

(SEPARATOR) = "\n-----\n"

# KEY
(SAFE_KEY, TRUE_KEY) = (generatekey(sys.argv[1]), sys.argv[1])

def flush_message(message):
    print(message)
    sys.stdout.flush()

def encrypt_backup_key():
    key = generatekey("BACKUP")
    return encipher(TRUE_KEY, key).decode("utf-8")

def get_file_name_and_true_path(path):
    if "\\" in path:
        path_separator = "\\"
    elif "/" in path:
        path_separator = "/"

    path_split = path.split(path_separator)
    file_name=path_split.pop()
    
    return (
        path_separator.join(path_split),    # GET FILE NAME REGARDLESS OF EXTENSION,
        # file_name,                          # TRUE FILE NAME
        file_name.split(".")[0]             # PATH WITHOUT FILE NAME
    )

# DIRECTORIES
# (DESKTOP) = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop') 
(PATH) = sys.argv[2]
(
    TRUE_PATH, 
    # TRUE_FILE_NAME, 
    FILE_NAME 
)= get_file_name_and_true_path(PATH)

def encrypt(file_name, path):
    with open(path, "br") as binary_file:
        # READ FILE
        read_file = binary_file.read()
        encoded_data = b64encode(read_file)

    # CREATE FILE NAME TO WRITE
    file_name += ".mis"
    file_path = os.path.join(TRUE_PATH, file_name)
    with open(file_path, "bw") as write_file:
        # WRITE META DATA
        ext = path.split("\\").pop().split(".").pop()
        meta = "{} | Encrypted By Make It Secret, {} | {}\n".format(
            ext,
            datetime.now(),
            encrypt_backup_key()
        )
        write_file.write(meta.encode())

        # WRITE SEPARATOR
        write_file.write(SEPARATOR.encode())

        # ENCRYPT DATA
        enc = encipher(encoded_data.decode("utf-8"), SAFE_KEY)

        # WRITE ENCRYPTED DATA
        write_file.write(enc)

    # DELETE ORIGINAL FILE
    os.remove(path)

def decrypt(file_name, path):
    with open(path, "r") as read_file:
        # READ FILE
        content = read_file.read()

        # READ META INFORMATION
        meta = content.split(SEPARATOR)[0]

        # GET ORIGINAL FILE EXTENSION FROM HEADER
        ext = ".{}".format(
            meta.split(" | ")[0]
        ) 
        
        # CREATE ORIGINAL FILE NAME
        file_name += ext
        file_path = os.path.join(TRUE_PATH, file_name)

        # GET FILE CONTENTS
        file_content = content.split(SEPARATOR)[-1].encode()

    # DECRYPT DATA
    dec = decipher(file_content.decode("utf-8"), SAFE_KEY)

    if dec == 0:
        # KEY MISMATCH
        flush_message("WRONG KEY")
        sys.exit(0)
        
    with open(file_path, "bw") as write_file:

        # WRITE DECRYPTED DATA
        write_file.write(b64decode(dec))
    
    # DELETE ENCRYPTED FILE
    os.remove(path)

if __name__ == "__main__":
    # METHOD
    method = sys.argv[3]

    if method == "encrypt": 
        # ENCRYPT
        encrypt(FILE_NAME, PATH)
    elif method == "decrypt": 
        # DECRYPT
        decrypt(FILE_NAME, PATH)
    else:
        # ERROR
        sys.exit(0)
    
    # STATUS
    flush_message("DONE")

    # MAKE SURE SCRIPT STOPS
    sys.exit(0)