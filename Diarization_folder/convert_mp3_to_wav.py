from pydub import AudioSegment
import os
def convert_mp3_to_wav(mp3_file_path, relative_directory):
    base_path = os.path.dirname(os.path.abspath(__file__)) 

    output_directory = os.path.join(base_path, relative_directory)
    mp3_path = os.path.join(base_path, mp3_file_path)
    wav_filename = os.path.join(output_directory, os.path.splitext(os.path.basename(mp3_file_path))[0] + ".wav")

    audio = AudioSegment.from_mp3(mp3_path)
    
    audio.export(wav_filename, format="wav")

# m2="wav_audio_FOLDER"
# m1="mp3_from_youtube_first_10_minutes_only/sample_audio_2.mp3"
# convert_mp3_to_wav(m1, m2)

