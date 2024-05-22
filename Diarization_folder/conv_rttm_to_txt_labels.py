def rttm_to_audacity_labels(rttm_file, output_txt):

    with open(rttm_file, 'r') as infile, open(output_txt, 'w') as outfile:
        for line in infile:
            fields = line.strip().split()

            start_time = float(fields[3])
            duration = float(fields[4])
            label = fields[7]

            end_time = start_time + duration

            outfile.write(f"{start_time:.6f}\t{end_time:.6f}\t{label}\n")


# input_rttm = r"/home/ionuthodoroaga/projectsBun/Diarization_folder/RTTM_and_LABELS_FOLDER/rttm_outputs_diarization/SIDEMEN CONTROVERSIAL AGREE OR DISAGREE.rttm"
# output_labels = r"/home/ionuthodoroaga/projectsBun/Diarization_folder/RTTM_and_LABELS_FOLDER/txt_labels_for_audacity/SIDEMEN CONTROVERSIAL AGREE OR DISAGREE.txt"
# rttm_to_audacity_labels(input_rttm,output_labels)

# input_rttm = 'audio.rttm'
# output_labels = r"/home/ionuthodoroaga/projectsBun/Diarization_folder/speakers_timestamps_identified/txt_labels_for_audacity.txt"
# rttm_to_audacity_labels(input_rttm, output_labels)

# '''
# this script converts rttm file which contains labels in a format not accepted by audacity to a format accepted by 
# audacity
# '''
