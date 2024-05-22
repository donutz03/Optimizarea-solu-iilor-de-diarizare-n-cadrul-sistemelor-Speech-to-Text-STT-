# import os
# import openai
# api_key = os.environ.get("OPENAI_API_KEY")
# client = openai.Client()

# audio_file= open(r"C:\Users\Lenovo\OneDrive\Desktop\internship OG\stt1_test.mp3", "rb")
# transcription = client.audio.transcriptions.create(
#     response_format='json',
#     timestamp_granularities='segment',
#     language='en',
#   model="whisper-1", 
#   file=audio_file
# )
# #print(transcription.text)
# print(transcription)


# # if api_key:
# #     print("OPENAI_API_KEY exists and its value is:", api_key)
# # else:
# #     print("OPENAI_API_KEY does not exist or is not set.")

# """
# output:
# That's a bit racist. Oh my god, no, you're one of those. How can you be racist against- and I'm also half white, so like, how can I be racist against you? You don't think you can be racist towards someone who's white? No, I don't, because you've never experienced racism in history. White people haven't experienced racism. One of the experiences- What's your definition of racism? Um, I'd say basically like the persecution in any type of way that leads to the downfall of just like someone's life. So by the way, the answer to this, you know, like causing someone's life to be worse because of their race, the answer to this is affirmative action, which is a zero-sum game. That is the actual answer. Or maybe equity injected into every area of the American government, a la Joe Biden. That would be an example of racism at work. It's America. And yes, of course black people can be racist. Is the idea that black people cannot be racist against Asians also, or just against white people? Is that the way this works?
# """