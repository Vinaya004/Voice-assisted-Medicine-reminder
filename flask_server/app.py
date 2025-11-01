
import os
import pytesseract
import cv2
import re
import pymongo
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Configure Tesseract path
TESSERACT_PATH = os.getenv("TESSERACT_PATH", "tesseract")
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

# Configure upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["ALLOWED_EXTENSIONS"] = {"png", "jpg", "jpeg"}

# MongoDB Connection
try:
    client = pymongo.MongoClient(os.getenv("MONGO_URI"))   
    db = client["prescription_db"]
    collection = db["prescriptions"]
    print("✅ Connected to MongoDB")
except pymongo.errors.ConnectionFailure as e:
    print("❌ MongoDB connection failed:", e)

# Helper function to check allowed file types
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]

# OCR Function
def extract_text_from_image(image_path):
    """Extract text from an image using OCR."""
    image = cv2.imread(image_path)

    if image is None:
        print(f"❌ Error: Could not load image at {image_path}. Check the file path.")
        return None

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)
    return text

# Function to extract medication details using regex
def extract_prescription_details(text):
    """Extract medicine details from OCR text."""
    prescription = {
        "medicine_name": None,
        "dosage": None,
        "frequency": None,
        "refills": None,
        "description": None
    }

    # Regex patterns
    medicine_pattern = r"(?i)(?:Medicine|Medication|Drug|Rx|Med)\s*[:\-]?\s*([\w\s\d-]+)(?=\n|$|Dosage|Strength|Take)"
    dosage_pattern = r"(?i)(?:Dosage|Strength):?\s*([\d]+\s*(?:mg|ml|g|mcg)?)"
    frequency_pattern = r"(?i)(?:Take|Frequency):?\s*(\d+\s*(?:times|x|per\s+day|daily|weekly|tablet[s]?))"
    refills_pattern = r"(?i)(?:Refills|Remaining):?\s*(\d+)"
    description_pattern = r"(?i)(?:Instructions|Description|Notes):?\s*(.+)"

    prescription["medicine_name"] = re.search(medicine_pattern, text)
    prescription["dosage"] = re.search(dosage_pattern, text)
    prescription["frequency"] = re.search(frequency_pattern, text)
    prescription["refills"] = re.search(refills_pattern, text)
    prescription["description"] = re.search(description_pattern, text)

    for key, value in prescription.items():
        if value:
            prescription[key] = value.group(1).strip()

    return prescription

@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    text = extract_text_from_image(filepath)
    if not text:
        return jsonify({"error": "Failed to extract text from image"}), 500

    extracted_data = extract_prescription_details(text)
    if not extracted_data["medicine_name"]:
        return jsonify({"error": "No valid prescription data found!"}), 400

    extracted_data["image_path"] = filepath
    collection.insert_one(extracted_data)

    return jsonify({"message": "Upload successful", "extracted_data": extracted_data}), 200

if __name__ == "__main__":
    app.run(debug=True)

