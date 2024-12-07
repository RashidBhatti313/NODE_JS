# File Handling Example in Python

# 1. File Ko Open Karna
# Yeh section file ko different modes mein open karne ka tariqa dikhata hai

print("\n--- File Open and Modes ---\n")

# Read Mode ("r") - file ko read mode mein open karta hai
file = open("example.txt", "r")
print("File opened in read mode.")
file.close()

# Write Mode ("w") - purani file ke data ko overwrite karta hai ya nahi to nayi file create karta hai
file = open("example.txt", "w")
print("File opened in write mode.")
file.close()

# Append Mode ("a") - file ke end mein data add karta hai bina overwrite kiye
file = open("example.txt", "a")
print("File opened in append mode.")
file.close()

# 2. File Ko Read Karna
# Yeh section file ke content ko read karna sikhata hai

print("\n--- File Read Operations ---\n")

# Read mode mein file ko kholke content read karna
with open("example.txt", "r") as file:
    content = file.read()  # Pure file ka content read karega
    print("Content of the file:\n", content)

# Readline - Sirf aik line read karega
with open("example.txt", "r") as file:
    line = file.readline()
    print("\nFirst line of the file:\n", line)

# Readlines - Saari lines ko list mein store karega
with open("example.txt", "r") as file:
    lines = file.readlines()
    print("\nAll lines as a list:\n", lines)

# 3. File Mein Write Karna
# Yeh section file mein data likhna sikhata hai

print("\n--- File Write Operations ---\n")

# Write mode - purani file ka data overwrite karta hai
with open("example.txt", "w") as file:
    file.write("Yeh naya content hai jo file mein likha gaya hai.")
print("Content written to the file in write mode.")

# 4. File Ko Close Karna
# Python mein with statement ke sath file close automatically ho jati hai, isliye hum directly `close()` ka use bhi dekh rahe hain

print("\n--- File Close Example ---\n")

file = open("example.txt", "r")
print("File manually opened.")
file.close()
print("File manually closed.")

# 5. With Statement Ka Use
# Yeh section with statement ka use dikha raha hai jo automatically file ko close kar deta hai

print("\n--- Using with Statement ---\n")

with open("example.txt", "r") as file:
    content = file.read()
    print("With statement used to read file content:\n", content)

# 6. Append Mode Ka Use
# File ke end mein data add karne ka tariqa dikhata hai

print("\n--- Append Mode ---\n")

with open("example.txt", "a") as file:
    file.write("\nYe naya line hai jo end mein add kiya gaya hai.")
print("New line appended to the file.")

# 7. File Mein Position Set Karna (seek() aur tell())
# Yeh section batata hai ke kaise file ke position ko check aur change karte hain

print("\n--- Using seek() and tell() ---\n")

with open("example.txt", "r") as file:
    print("Current Position:", file.tell())  # Starting position
    file.seek(5)                             # Move to 5th character
    print("Position after seeking to 5:", file.tell())
    print("Content from position 5:\n", file.read())

# 8. File Ko Binary Mode Mein Handle Karna
# Binary files (e.g., images) ko read aur write karne ka tariqa

print("\n--- Binary Mode ---\n")

with open("image.jpg", "rb") as file:
    data = file.read(10)  # Sirf 10 bytes read karega as an example
    print("First 10 bytes of the image file in binary mode:\n", data)



# Advance File Handling In Python..

import os
import json
import csv
import pickle

# 1. Directory Operations with `os` Module
print("\n--- Directory Operations ---\n")

# Current directory ka path dekhna
current_directory = os.getcwd()
print("Current Directory:", current_directory)

# New directory banana
new_directory = os.path.join(current_directory, "test_dir")
os.makedirs(new_directory, exist_ok=True)
print(f"Directory '{new_directory}' created or already exists.")

# Directory ko list karna
print("\nFiles in the current directory:")
for item in os.listdir(current_directory):
    print(" -", item)

# 2. Exception Handling for Robust File Handling
print("\n--- Exception Handling ---\n")

try:
    with open("nonexistent_file.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found. Please check the file name or path.")
except IOError:
    print("An error occurred while accessing the file.")

# 3. JSON File Handling
# JSON files ko handle karne ke liye `json` module ka use karte hain.

print("\n--- JSON File Handling ---\n")

# Data ko JSON file mein likhna
data = {"name": "Ali", "age": 25, "city": "Karachi"}
with open("data.json", "w") as json_file:
    json.dump(data, json_file)
print("Data written to JSON file.")

# JSON file ko read karna
with open("data.json", "r") as json_file:
    loaded_data = json.load(json_file)
    print("Data loaded from JSON file:", loaded_data)

# 4. CSV File Handling
# CSV (Comma-Separated Values) files handle karne ke liye `csv` module ka use karte hain.

print("\n--- CSV File Handling ---\n")

# Writing to CSV file
header = ["Name", "Age", "City"]
rows = [["Ali", 25, "Karachi"], ["Ahmed", 30, "Lahore"], ["Sara", 22, "Islamabad"]]
with open("data.csv", "w", newline="") as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(header)
    writer.writerows(rows)
print("Data written to CSV file.")

# Reading from CSV file
with open("data.csv", "r") as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        print(row)

# 5. Pickle Module for Complex Data Serialization
# Python objects ko binary format mein store karne ke liye `pickle` module ka use karte hain.

print("\n--- Pickle File Handling ---\n")

# Object ko pickle file mein save karna
data_object = {"name": "Ali", "age": 25, "skills": ["Python", "Data Analysis"]}
with open("data.pkl", "wb") as pickle_file:
    pickle.dump(data_object, pickle_file)
print("Object serialized and written to Pickle file.")

# Pickle file se object load karna
with open("data.pkl", "rb") as pickle_file:
    loaded_object = pickle.load(pickle_file)
    print("Object loaded from Pickle file:", loaded_object)

# 6. Context Management with `with` Statement
# `with` statement ka use context management ke liye karte hain, jo automatically file ko close kar deta hai.

print("\n--- Context Management ---\n")

# Multiple files ko ek hi `with` block mein handle karna
with open("data.json", "r") as json_file, open("data.csv", "r") as csv_file:
    json_data = json.load(json_file)
    csv_data = list(csv.reader(csv_file))
    print("JSON Data:", json_data)
    print("CSV Data:", csv_data)

# 7. File Permissions
# File permissions set karna ya check karna `os` module ka use karke.

print("\n--- File Permissions ---\n")

# File permission check karna
file_path = "data.json"
if os.access(file_path, os.R_OK):
    print(f"{file_path} is readable.")
if os.access(file_path, os.W_OK):
    print(f"{file_path} is writable.")
if os.access(file_path, os.X_OK):
    print(f"{file_path} is executable.")

# 8. Temporary Files with `tempfile` Module
# Temporary files banane aur use karne ke liye `tempfile` module ka use karte hain.

print("\n--- Temporary Files ---\n")

import tempfile

with tempfile.NamedTemporaryFile(delete=False) as temp_file:
    temp_file.write(b"Temporary data!")
    print("Temporary file created:", temp_file.name)

# Clean up: Remove the temporary file after use
os.remove(temp_file.name)
print("Temporary file deleted.")
