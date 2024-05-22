def convert_to_rttm(input_file, output_file):
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        for line in infile:
            start_time, end_time, speaker_id = line.strip().split()
            duration = float(end_time) - float(start_time)
            rttm_line = (
                f"SPEAKER RotaruPetevebrbattiicumsepuneproblemalaCraiovamp 1 "
                f"{float(start_time):.3f} {duration:.3f} <NA> <NA> {speaker_id} <NA> <NA>\n"
            )
            outfile.write(rttm_line)

input_file = 'labels_10_min_ro.txt'
output_file = 'ground_truth.rttm'
convert_to_rttm(input_file, output_file)
