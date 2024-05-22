from pytube import YouTube
import re

def download_video(url, output_path):
    yt = YouTube(url)
    """ note that this function might not work unless you change 
    var_regex = re.compile(r"^\w+\W") to var_regex = re.compile(r"^\$*\w+\W")
    in cipher.py from pytube 
    https://stackoverflow.com/questions/70776558/pytube-exceptions-regexmatcherror-init-could-not-find-match-for-w-w
    """
    stream = yt.streams.get_lowest_resolution()
    #new_filename = "".join(stream.default_filename.split(" "))
    #new_filename = ''.join(re.findall(r'\w', stream.default_filename))
    new_filename = ''.join(re.findall(r'[a-zA-Z]+', stream.default_filename))
    print("nume fisier: ----", new_filename)
    stream.download(output_path, filename=new_filename)
    return new_filename

if __name__ == "__main__":
    video_url = "https://www.youtube.com/watch?v=NeLuOlnXlCA&ab_channel=OrangeSportRomania"

    output_directory = "/home/ionuthodoroaga/projectsBun/Diarization_folder/downloaded_youtube_videos"

    # if not os.path.exists(output_directory):
    #     os.makedirs(output_directory)

    download_video(video_url, output_directory)

