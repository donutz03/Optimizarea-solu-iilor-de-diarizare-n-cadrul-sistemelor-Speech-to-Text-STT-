from codGPU_pyannote import gpu_diarization
from conv_rttm_to_txt_labels import rttm_to_audacity_labels
import os

def convert_wav_to_rttm( wav_filename,
                                rttm_outputs_folder="RTTM_and_LABELS_FOLDER/rttm_outputs_diarization",
                                labels_audacity_txts_folder="RTTM_and_LABELS_FOLDER/txt_labels_for_audacity",
                                wav_audio_folder="wav_audio_FOLDER"):
  
  base_path = os.path.dirname(os.path.abspath(__file__)) 

  filename = os.path.splitext(os.path.basename(wav_filename))[0]

  rttm_output_path = os.path.join(base_path, rttm_outputs_folder + "/"+ filename +  ".rttm")

  gpu_diarization(wav_filename,rttm_output_path)

  labels_audacity_txts_folder_file = base_path + "/" + labels_audacity_txts_folder + "/" + filename + ".txt"
  rttm_to_audacity_labels(rttm_output_path, labels_audacity_txts_folder_file)
  
  print(f"Speaker diarization complete for video: {wav_filename}")
  wav_output_path = os.path.join(base_path, wav_audio_folder + "/"+ filename +  ".wav")

  return {"rttm_path": rttm_output_path, "txt_path_audacity": labels_audacity_txts_folder_file, "wav_path": wav_filename}

# if __name__ == "__main__":
#   wav_filename = "/home/ionuthodoroaga/projectsBun/Diarization_folder/wav_audio_FOLDER/ImCharismaticCristianoRonaldotellsPiersMorganwhyhethinkshessofamousmp.wav"
#   print(convert_wav_to_rttm(wav_filename))
