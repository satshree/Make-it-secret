"""
    Recover Key From Files Encrypted By Make It Secret.
"""

import os
import sys
from tkinter.filedialog import askopenfilename
from EncryptDecrypt import generatekey, decipher

(SEPARATOR) = "\n-----\n"
(KEY) = generatekey("BACKUP")

if __name__ == "__main__":
    print("-" * 60)
    print("Recover Key From Files Encrypted By Make It Secret.")
    print("-" * 60)

    while True:
        try:
            try:
                input("Press Enter to select a 'make-it-secret' (*.mis) file.")
            except KeyboardInterrupt:
                print("")
                raise KeyboardInterrupt

            file_path = askopenfilename(initialdir=dir)
            print("-" * 60)

            if not file_path:
                exit_ = input("Exit? [y/n]: ")
                if exit_.lower() in ('y', 'yes'):
                    raise KeyboardInterrupt
                else:
                    continue

            if "\\" in file_path:
                path_separator = "\\"
            elif "/" in file_path:
                path_separator = "/"

            if file_path.split(path_separator)[-1].split(".")[-1] != "mis":
                print("Please select a 'make-it-secret' (*.mis) file.")
                print("-" * 60)
            else:
                with open(file_path, "r") as file:
                    contents = file.read()
                    meta = contents.split(SEPARATOR)[0]
                    true_key = decipher(meta.split(" | ")[-1], KEY)
            
                if true_key == 0:
                    print("Unable to retrieve key.")
                    print("-" * 60)
                else:
                    print("Key: {}".format(true_key.decode("utf-8")))
                    print("-" * 60)
        except KeyboardInterrupt:
            print("-" * 60)
            print("Exiting ... \n\n")
            sys.exit(0)
        except Exception as e:
            print("Exception: {}".format(str(e)))
            print("-" * 60)