import os
from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS
from main_py_program import complete_youtube_processing
from werkzeug.utils import secure_filename
from browse_and_upload import convert_wav_to_rttm

app = Flask(__name__)
CORS(app)

@app.route('/uploadWav', methods=['POST'])
def upload_wav():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'})
    
    if file and file.filename.endswith('.wav'):
        filename = secure_filename(file.filename)
        base_path = os.path.dirname(os.path.abspath(__file__)) 
        upload_folder = os.path.join(base_path, "wav_audio_FOLDER")
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        print(f'File uploaded: {file_path}')
        response_data = convert_wav_to_rttm(file_path)
        return jsonify(response_data)
    else:
        return jsonify({'error': 'Invalid file format. Please upload a WAV file.'})

@app.route('/process_video', methods=['POST'])
def process_video():
    request_data = request.json
    
    if 'youtube_link' in request_data:
        youtube_link = request_data['youtube_link']
        
        response_data = complete_youtube_processing(youtube_link.replace("\"",""))
        print(response_data)
        return jsonify(response_data)
    else:
        return jsonify({'error': 'No YouTube link provided'})

@app.route('/get_wav/<path:wav_path>', methods=['GET'])
def get_wav(wav_path):
    return send_file("/" + wav_path, as_attachment=True)

@app.route('/get_rttm/<path:rttm_path>', methods=['GET'])
def get_rttm(rttm_path):
    if os.path.exists("/"+rttm_path):
        with open("/"+rttm_path, 'r') as file:
            rttm_content = file.read()
        return Response(
            rttm_content,
            mimetype="text/rttm",
            headers={"Content-disposition":
                     "attachment; filename=" + "/"+rttm_path})
    else:
        return jsonify({'error': 'RTTM file not found'})


@app.route('/get_txt/<path:txt_path>', methods=['GET'])
def get_txt(txt_path):
    if os.path.exists("/"+txt_path):
        with open("/"+txt_path, 'r') as file:
            txt_content = file.read()
        return Response(
            txt_content,
            mimetype="text/rttm",
            headers={"Content-disposition":
                     "attachment; filename=" + "/"+txt_path})
    else:
        return jsonify({'error': 'TXT file not found'})

if __name__ == '__main__':
    app.run(debug=True)
