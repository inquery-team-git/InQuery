from flask import Flask, request, jsonify, make_response
import logging, sys


app = Flask(__name__)
logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Starting the application")

@app.route('/health')
def health():
    return jsonify(status="healthy"), 200


@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Received a POST request")

    # TODO: insert prediction model here
    original_headers = request.headers
    response = "3600" if int(original_headers["content-length"]) > 200 else "1"
    logger.info("Header: %s", original_headers["content-length"])
    logger.info("Response: %s", response)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')