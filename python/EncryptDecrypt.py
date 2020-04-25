"""
Simple Encryption and Decryption python program.
Reference taken from = {https://nitratine.net/blog/post/encryption-and-decryption-in-python/}
Author = Satshree Shrestha
Date started = 5/29/2019
First stable version created = 6/1/2019
Executable file created = 6/4/2019
"""

# Import all the required modules
import base64
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet


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
    try:
        # Convert message into bytes
        cipher_text = message.encode()

        f = Fernet(user_key)

        plain = f.decrypt(cipher_text)

        return plain
    except:
        return 0


    
