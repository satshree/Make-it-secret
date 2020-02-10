"""
Simple Encryption and Decryption python program.
Reference taken from = {https://nitratine.net/blog/post/encryption-and-decryption-in-python/}
Author = Satshree Shrestha
Date started = 5/29/2019
First stable version created = 5/31/2019
Executable file created = 6/4/2019
Second executable file created = 6/11/2019
"""

# Import all the required modules
import base64
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet
import pyperclip


def generatekey(user_key):

    # This is the key provided by user.
    key_provided = user_key

    # Convert the user's key into bytes
    password = key_provided.encode()

    # Salt for SHA256 hash
    salt = b'StrongestAvenger__HULK'

    # Generate Hash
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )

    # Key used for encryption/decryption
    key = base64.urlsafe_b64encode(kdf.derive(password))

    return key

def encipher(message, user_key):
    # Convert message into bytes
    plain_text = message.encode()

    f = Fernet(user_key)

    cipher = f.encrypt(plain_text)

    return cipher

def decipher(message, user_key):
    # Convert message into bytes
    cipher_text = message.encode()

    f = Fernet(user_key)

    plain = f.decrypt(cipher_text)

    return plain

# MAIN SCRIPT
print("Make it secret..")
print("\n\nMade by Satshree Shrestha, Nepal\n\n")
print("Encrypt or Decrypt message.\n\n")

MAINLOOP = 1
while MAINLOOP == 1:
    print("")
    LOOP = 1
    while LOOP == 1:
        try:
            userkey = input("Enter your secret key for encryption or decryption process: ")
            key_ = generatekey(userkey)
            LOOP = 0
        except:
            print("\nError detected, try again!\n")

    print("\n\n")

    LOOP = 1
    while LOOP == 1:
        try:
            originalMsg = input("Enter your message: ")
            msg=originalMsg
            LOOP = 0
        except:
            print("\nError detected, try again!\n")

    print("\n\nNow, what would you like to do?\n\n1. Encryption\n2. Decryption\n")

    SUBLOOP = 1
    while SUBLOOP == 1:
        LOOP = 1
        while LOOP == 1:
            try:
                choice = int(input("Enter your choice[1/2]: "))
                SUBLOOP = 0
                LOOP = 0
            except:
                print("\nError detected, try again!\n")

    try:
        if choice == 1:
            for i in range(7):
                cipherText = encipher(msg, key_)
                msg = cipherText.decode("utf-8")

            print("\n\nThe encrypted message is \n", cipherText.decode("utf-8"))
            pyperclip.copy(cipherText.decode("utf-8"))
            print("\n\nThe cipher text has been copied to the clipboard.\nYou can paste it anywhere.\n")
            SUBLOOP = 0
        elif choice == 2:
            for i in range(7):
                plainText = decipher(msg, key_)
                msg = plainText.decode("utf-8")

            print("\n\nThe decrypted message is \n", plainText.decode("utf-8"))
            pyperclip.copy(plainText.decode("utf-8"))
            print("\n\nThe message has been copied to the clipboard.\nYou can paste it anywhere.\n")
            SUBLOOP = 0
        else:
            print("Error, please enter either 1 or 2.\n")
    except:
        print("\nError in key!")

    SUBLOOP = 1
    while SUBLOOP == 1:
        print("")
        LOOP = 1
        while LOOP == 1:
            try:
                continue_ = input("Would you like to carry on another encryption/decryption process?[Y/N]: ")
                LOOP = 0
            except:
                print("\nError detected, try again!\n")

        if continue_ == "Y" or continue_ == "y" or continue_ == "YES" or continue_ == "yes":
            SUBLOOP = 0
        elif continue_ == "N" or continue_ == "n" or continue_ == "NO" or continue_ == "no":
            SUBLOOP = 0
            MAINLOOP = 0
            print("\nThank You For Using This Program.")
        else:
            print("Try Again!")
