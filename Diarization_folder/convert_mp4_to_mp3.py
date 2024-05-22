from moviepy.editor import VideoFileClip
from pydub import AudioSegment
import os

def extract_audio(video_path, relative_directory):
    #try:
    video_clip = VideoFileClip(video_path)


    #600 era original = 10 min
    #modificat la 30s pt rapiditate testare
    extract_duration = min(video_clip.duration, 60)  

    audio_clip = video_clip.subclip(0, extract_duration).audio
    base_path = os.path.dirname(os.path.abspath(__file__)) 

    output_directory = os.path.join(base_path, relative_directory)
    audio_filename = os.path.join(output_directory, os.path.splitext(os.path.basename(video_path))[0] + ".mp3")

    audio_clip.write_audiofile(audio_filename, codec='mp3')

       