"""
Simple Encryption and Decryption python program.
Author = Satshree Shrestha
Date started = 5/29/2019
First stable version created = 6/1/2019
Executable file created = 6/4/2019
"""

# Import Modules
try:
    from tkinter import *
    from tkinter import messagebox
    import pyperclip
    import EncryptDecrypt
    import write
except:
    print("Please run 'Install these prerequisites.bat' before running the program.\nThank You.\n\n")
    enter = input("Press Enter to exit.")
    exit()
    

# FUNCTIONS

def first_page(app):
    # This is the first page
    
    # Create a frame
    startPage = Frame(app, bg="#1a0d00")
    startPage.place(relwidth=1, relheight=1)

    # Create labels variable
    Title = StringVar()
    Title.set("Encrypt or Decrypt your message with your secret key!")

    Ask = StringVar()
    Ask.set("What would you like to do?")

    # Setting labels
    lblTitle = Label(startPage, textvariable=Title, bg="#1a0d00", fg="white",
                     font=("Arial 18 bold"))
    lblAsk = Label(startPage, textvariable=Ask, bg="#1a0d00", fg="white",
                   font=("Arial", 14))

    lblTitle.place(relx=0.05, rely=0.05)
    lblAsk.place(relx=0.33, rely=0.33)

    # Create buttons
    btnEncrypt = Button(startPage, text="Encrypt Message",
                        bg="#0066cc", fg="white", font=("Arial", 14),
                        command=lambda: second_page(app, 1))
    btnEncrypt.place(relx=0.38, rely=0.5)

    btnDecrypt = Button(startPage, text="  Decrypt Cipher  ",
                        bg="#0066cc", fg="white", font=("Arial", 14),
                        command=lambda: second_page(app, 2))
    btnDecrypt.place(relx=0.38, rely=0.65)

    # Author
    Author = StringVar()
    Author.set("Made by Satshree Shrestha.")

    lblAuthor = Label(startPage, textvariable=Author, font=("Arial", 8),
                      bg="#1a0d00", fg="white",
                      anchor="w")
    lblAuthor.pack(side="bottom", fill="x")

##################################################################################
    
def second_page(app, whatToDo):
    # This is the second page
    try:
        # Create a frame 
        msgPage = Frame(app, bg="#1a0d00")
        msgPage.place(relwidth=1, relheight=1)

        # Create labels variable
        Title = StringVar()
        Title.set("Encrypt or Decrypt your message with your secret key!")

        Message = StringVar()
        if whatToDo == 1:
            Message.set("Enter Your Message:")
        elif whatToDo == 2:
            Message.set("Enter Your Cipher:")
        else:
            DONOTHING=0    

        # Setting labels
        lblTitle = Label(msgPage, textvariable=Title, bg="#1a0d00", fg="white",
                         font=("Arial 18 bold"))
        lblTitle.place(relx=0.05, rely=0.05)

        lblMessage = Label(msgPage, textvariable=Message, bg="#1a0d00", fg="white",
                           font=("Arial", 14))
        lblMessage.place(relx=0.05, rely=0.2)

        

        # Create textboxes
        txtMessage = Text(msgPage, font=("Arial", 9), wrap="word", relief="groove",
                          spacing1=1, spacing2=1, spacing3=1,
                          width=89, height=14)
        txtMessage.place(relx=0.05, rely=0.32)
        

        # Create buttons
        btnStartOver = Button(msgPage, text="Start Over Again",
                              bg="#0066cc", fg="white", font=("Arial", 14),
                              command=lambda: first_page(app))
        btnStartOver.place(relx=0.05, rely=0.85)

        if whatToDo == 2:
            btnPaste = Button(msgPage, text="Paste Cipher",
                              bg="#0066cc", fg="white", font=("Arial", 14),
                              command=lambda: txtMessage.insert(END, pyperclip.paste()))
            btnPaste.place(relx=0.45, rely=0.85)

        btnNext = Button(msgPage, text="Next",
                         bg="#0066cc", fg="white", font=("Arial", 14),
                         command=lambda: redirect_thirdpage(app, whatToDo, txtMessage.get("1.0", END)))
        btnNext.place(relx=0.866, rely=0.85)

        # Author
        Author = StringVar()
        Author.set("Made by Satshree Shrestha.")

        lblAuthor = Label(msgPage, textvariable=Author, font=("Helvetica", 8),
                          bg="#1a0d00", fg="white",
                          anchor="w")
        lblAuthor.pack(side="bottom", fill="x")
    except:
        redirectItself_secondpage(app, whatToDo)

def redirect_thirdpage(app, whatToDo, msg):
    # This checks for empty message box before redirecting to third page from second page
    
    if len(msg) == 1:
        messagebox.showwarning("Warning!", "You cannot leave the message box empty.")
        second_page(app, whatToDo)
    else:
        third_page(app, whatToDo, msg)

def redirectItself_secondpage(app, whatToDo):
    # This redirects back to second page in case of errors
    messagebox.showerror("Error", "Unfortunately, unexpected error occurred. Please try again!")
    second_page(app, whatToDo)
    
##################################################################################
    
def third_page(app, whatToDo, msg):
    # This is the third page
    try:
        # Create a frame 
        keyPage = Frame(app, bg="#1a0d00")
        keyPage.place(relwidth=1, relheight=1)

        # Create labels variable
        Title = StringVar()
        Title.set("Encrypt or Decrypt your message with your secret key!")

        Key = StringVar()
        Key.set("Enter Your Secret Key:")

        Enc = StringVar()
        Enc.set("Make sure to keep this key safe because without it, the message cannot be decrypted!\n\nThe key will be saved in file 'KEY.txt' in the same folder this program is contained.")

        EncNote = StringVar()
        EncNote.set("Note: A key can be a word, letter, numbers or combination of all.")
        
        Dec = StringVar()
        Dec.set("Incorrect key can not perform decryption!")
        
        # Setting labels
        lblTitle = Label(keyPage, textvariable=Title, bg="#1a0d00", fg="white",
                         font=("Arial 18 bold"))
        lblTitle.place(relx=0.05, rely=0.05)

        lblKey = Label(keyPage, textvariable=Key, bg="#1a0d00", fg="white",
                       font=("Arial", 14))
        lblKey.place(relx=0.05, rely=0.4)

        if whatToDo == 1:
            lblEnc = Label(keyPage, textvariable=Enc, bg="#1a0d00", fg="white",
                       font=("Arial", 12))
            lblEnc.place(relx=0.05, rely=0.65)
            
            lblEncNote = Label(keyPage, textvariable=EncNote, bg="#1a0d00", fg="white",
                       font=("Arial", 14))
            lblEncNote.place(relx=0.05, rely=0.225)
        elif whatToDo == 2:
            lblDec = Label(keyPage, textvariable=Dec, bg="#1a0d00", fg="white",
                       font=("Arial", 14))
            lblDec.place(relx=0.05, rely=0.65)
        else:
            DONOTHING = 0
        
        # Create textboxes
        txtKeyInput = Entry(keyPage, font=("Arial", 12), width=69, relief="groove", show="●")
        txtKeyInput.place(relx=0.05, rely=0.52)

        # Create buttons
        btnStartOver = Button(keyPage, text="Start Over Again",
                              bg="#0066cc", fg="white", font=("Arial", 14),
                              command=lambda: first_page(app))
        btnStartOver.place(relx=0.05, rely=0.85)

        btnNext = Button(keyPage, text="Next",
                         bg="#0066cc", fg="white", font=("Arial", 14),
                         command=lambda: further_redirect(app, whatToDo, msg, txtKeyInput.get()))
            
        btnNext.place(relx=0.866, rely=0.85)


        # Author
        Author = StringVar()
        Author.set("Made by Satshree Shrestha.")

        lblAuthor = Label(keyPage, textvariable=Author, font=("Arial", 8),
                          bg="#1a0d00", fg="white",
                          anchor="w")
        lblAuthor.pack(side="bottom", fill="x")
    except:
        redirectItself_thirdpage(app, whatToDo, msg)

def further_redirect(app, whatToDo, msg, key):
    # This checks for empty key

    if key == "":
        messagebox.showwarning("Warning!", "You cannot provide empty key!")
    else:
        if whatToDo == 1:
            write.writeKey(key) # Write the key in the 'KEY.txt' file
            encryption(app, msg, key)
        elif whatToDo == 2:
            decryption(app, msg, key)
        else:
            DONOTHING = 0

def redirectItself_thirdpage(app, whatToDo, msg):
    # This redirects back to third page in case of errors
    messagebox.showerror("Error", "Unfortunately, unexpected error occurred. Please try again!")
    third_page(app, whatToDo, msg)
    
##################################################################################

def last_page(app, whatHasBeenDone):
    
    # Create a frame 
    outputPage = Frame(app, bg="#1a0d00")
    outputPage.place(relwidth=1, relheight=1)

    # Create labels variable
    Title = StringVar()
    Title.set("Encrypt or Decrypt your message with your secret key!")

    outputMessage = StringVar()
    
    if whatHasBeenDone == 1:
        outputMessage.set("Encryption has been done successfully!\n\nYou can find the encrypted message in the same folder\nthis program is contained in the text file named 'Encrypted Message.txt'\n\nThank You for using this program.")
    elif whatHasBeenDone == 2:
        outputMessage.set("Decryption has been done successfully!\n\nYou can find the decrypted message in the same folder\nthis program is contained in the text file named 'Decrypted Message.txt'\n\nThank You for using this program.")
    elif whatHasBeenDone == 3:
        outputMessage.set("\t  Decryption unsuccessful!\n\n\t  Make sure to enter the correct key for decryption.\n\n\t  Thank You for using this program.")
    else:
        DONOTHING = 0

    # Setting labels
    lblTitle = Label(outputPage, textvariable=Title, bg="#1a0d00", fg="white",
                     font=("Arial 18 bold"))
    lblTitle.place(relx=0.05, rely=0.05)

    lblOutputMessage = Label(outputPage, textvariable=outputMessage, bg="#1a0d00", fg="white",
                     font=("Arial", 12))
    lblOutputMessage.place(relx=0.155, rely=0.4)

    # Create buttons
    btnStartOver = Button(outputPage, text="Start Over Again",
                          bg="#0066cc", fg="white", font=("Arial", 14),
                          command=lambda: first_page(app))
    btnStartOver.place(relx=0.05, rely=0.85)

    btnClose = Button(outputPage, text="Close",
                         bg="#0066cc", fg="white", font=("Arial", 14),
                         command=lambda: app.destroy())
    btnClose.place(relx=0.86, rely=0.85)

    # Author
    Author = StringVar()
    Author.set("Made by Satshree Shrestha.")

    lblAuthor = Label(outputPage, textvariable=Author, font=("Helvetica", 8),
                      bg="#1a0d00", fg="white",
                      anchor="w")
    lblAuthor.pack(side="bottom", fill="x")

##################################################################################
    
def encryption(app, msg, key):
    # Generate Key
    key_ = EncryptDecrypt.generatekey(key)

    
    # Encryption
    for i in range(7):
        cipherText = EncryptDecrypt.encipher(msg, key_)
        msg = cipherText.decode("utf-8")

    # Redirect to last page
    last_page(app, 1)

    # Write the encrypted message to 'Encrypted Message.txt' file
    write.writeEncrypt(msg)
 

def decryption(app, msg, key):
    
    # Generate Key
    key_ = EncryptDecrypt.generatekey(key)
    
    # Decryption
    for i in range(7):
        plainText = EncryptDecrypt.decipher(msg, key_)
        if plainText == 0:
            messagebox.showerror("Error!", "Digital Signature Mismatched!\nThe key you provided for corresponding cipher text is incorrect!")
            
            break
        else:
            msg = plainText.decode("utf-8")

    # Redirect to last page
    if plainText != 0:
        last_page(app, 2)
        # Write the decrypted message to 'Decrypted Message.txt' file
        write.writeDecrypt(msg)
    else:
        last_page(app, 3)
       
##################################################################################
            
# Create a window
app = Tk()
app.title("Make it secret...")

print("A program to encrypt or decrypt message.\nMade by Satshree Shrestha, Nepal.\n\n")
print("This is a terminal window.\nAny errors are displayed here.\nYou don't have to panic.\n\n")

first_page(app)

# Window properties
app.geometry("700x500")
app.resizable(False, False)
app.mainloop()
