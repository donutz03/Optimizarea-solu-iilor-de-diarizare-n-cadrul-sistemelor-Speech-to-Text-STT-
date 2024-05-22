from youtube_download_video import download_video
from convert_mp4_to_mp3 import extract_audio
from convert_mp3_to_wav import convert_mp3_to_wav
from codGPU_pyannote import gpu_diarization
from conv_rttm_to_txt_labels import rttm_to_audacity_labels
import os

def complete_youtube_processing(youtube_url, 
                                downloaded_yt_videos_folder="downloaded_youtube_videos", 
                                mp3_from_mp4_first_10_mins_only_folder="mp3_from_youtube_first_10_minutes_only",
                                rttm_outputs_folder="RTTM_and_LABELS_FOLDER/rttm_outputs_diarization",
                                labels_audacity_txts_folder="RTTM_and_LABELS_FOLDER/txt_labels_for_audacity",
                                wav_audio_folder = "wav_audio_FOLDER"):
  
  base_path = os.path.dirname(os.path.abspath(__file__)) 
  output_yt = os.path.join(base_path, downloaded_yt_videos_folder)
  mp4_filename = download_video(youtube_url, output_yt)
  print("\ndownloaded video")
  
  mp4_path = output_yt+ "/" + mp4_filename
  mp3_audio_filename = mp3_from_mp4_first_10_mins_only_folder + "/" + os.path.splitext(mp4_filename)[0]+".mp3"

  extract_audio(mp4_path, mp3_from_mp4_first_10_mins_only_folder)
  print("\nextracted audio")

  
  output_directory = os.path.join(base_path, wav_audio_folder)
  wav_filename = os.path.join(output_directory, os.path.splitext(os.path.basename(mp3_audio_filename))[0] + ".wav")
  filename = os.path.splitext(os.path.basename(mp3_audio_filename))[0]

  convert_mp3_to_wav(mp3_audio_filename, wav_audio_folder)
  print("\nconverted to wav")
  rttm_output_path = os.path.join(base_path, rttm_outputs_folder + "/"+ filename +  ".rttm")

  gpu_diarization(wav_filename,rttm_output_path)

  labels_audacity_txts_folder_file = base_path + "/" + labels_audacity_txts_folder + "/" + filename + ".txt"
  rttm_to_audacity_labels(rttm_output_path, labels_audacity_txts_folder_file)
  
  print(f"Speaker diarization complete for video: {youtube_url}")
  return {"rttm_path": rttm_output_path, "txt_path_audacity": labels_audacity_txts_folder_file, "wav_path": wav_filename}

# if __name__ == "__main__":
#   #youtube_url = "https://www.youtube.com/watch?v=NeLuOlnXlCA&ab_channel=OrangeSportRomania"
#   youtube_url = "https://www.youtube.com/watch?v=016DtYxKm0Q&ab_channel=BorussiaDortmund"
#   yt_url="https://www.youtube.com/watch?v=RI2SBB6t2tY&ab_channel=talkSPORT"
#   complete_youtube_processing(yt_url)
