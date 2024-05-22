
import time
import torch

from pyannote.audio import Pipeline

pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="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")


def gpu_diarization(input_file,output_file):
    pipeline.to(torch.device("cuda"))
    start_time = time.time()
    diarization = pipeline(input_file)
    with open(output_file, "w") as rttm:
        diarization.write_rttm(rttm)
    end_time = time.time()
    print(f'The elapsed time for GPU version is: {end_time - start_time}')

    # print the result
    # for turn, _, speaker in diarization.itertracks(yield_label=True):
    #     print(f"start={turn.start:.1f}s stop={turn.end:.1f}s speaker_{speaker}")

if __name__=="__main__": 
    #input_data = "test5_part1234.wav"
    #input_data = "test_15m.wav"
    #input_data = "test16k.wav"
    input_data = r"/home/ionuthodoroaga/projectsBun/Diarization_folder/wav_audio_FOLDER/ab12.wav"
    #input_data2=r"/home/ionuthodoroaga/projectsBun/Diarization_folder/mp3_from_youtube_first_10_minutes_only/sample_audio_2.wav"
    #cpu_diarization(input_data)
    gpu_diarization(input_data)
    # cpu_diarization(input_data2)
    # gpu_diarization(input_data2)


    # # Timp procesare
# 9s audio
# The elapsed time for CPU version is: 0.5131328105926514
# The elapsed time for GPU version is: 0.7628486156463623

# 32s audio
# The elapsed time for CPU version is: 10.854256629943848
# The elapsed time for GPU version is: 1.8029365539550781

# 1m audio
# The elapsed time for CPU version is: 24.22282075881958
# The elapsed time for GPU version is: 4.378647565841675


#2m  72s cpu 12s gpu
# 10m ?? 180s gpu
# 15m audio
# The elapsed time for CPU version is: 580.9006068706512
# The elapsed time for GPU version is: 223.34378838539124


# Cod sursa



# def cpu_diarization(input_file):
#     # send pipeline to CPU
#     pipeline.to(torch.device("cpu"))
#     start_time = time.time()
#      # apply pretrained pipeline
#     diarization = pipeline(input_file)
#     # dump the diarization output to disk using RTTM format
#     with open("audio_cpu.rttm", "w") as rttm:
#         diarization.write_rttm(rttm)
#     end_time = time.time()
#     print(f'The elapsed time for CPU version is: {end_time - start_time}')

#     # print the result
#     # for turn, _, speaker in diarization.itertracks(yield_label=True):
#     #     print(f"start={turn.start:.1f}s stop={turn.end:.1f}s speaker_{speaker}")
