Acest proiect foloseste pyannote 3.1 - speaker diarization, un model de pe Hugging Face. 

Arhitectura proiectului este formata din 2 parti: frontend si backend. Frontend se porneste cu ajutorul extensiei LiveServer. Pentru a porni frontendul este nevoie de o fereastra noua de VS Code, care sa contina doar folderul user_interface. Acolo se va porni LiveServer.
Backendul se porneste cu ajutorul programului main_server.py.

Versiune de python: 3.9.7
WSL version: 2.1.5.0
Proiectul trebuie sa fie rulat pe Ubuntu 22.04.3 LTS si cu ajutorul WSL. Proiectul este, de asemenea, realizat in 
Visual Studio Code.Toate pachetele au fost instalate in folderul
venvDiarizationBun, dar se gasesc si in fisierul requirements.txt.

Scopul proiectului este de a implementa o solutie de diarizare existenta pe mai multe fisiere wav diferite.


Frontendul este realizat in Html, Css, Javascript. In principal, Javascript predomina, unde, in fisierul index.js
se fac toate fetchurile catre datele trimise din backend. Mai mult, in fisierul index.js se randeaza libraria 
Waveforms, alaturi de plugin-urile RegionsPlugin si Minimap.

Partea de backend include mai multe subprograme, printre care se numara: 
- Folderul CEDR Metric este unul cu sursa deschisa de pe github care calculeaza DER (Diarization Error Ratio) 
pentru 2 fisiere. Primul fisier reprezinta Ground Truth si este o diarizare realizata in Audacity pe 
videoclipul: https://www.youtube.com/watch?v=NeLuOlnXlCA&ab_channel=OrangeSportRomania. Al doilea fisier este
outputul programului principal de diarizare denumit main_py_program.py.
- Folderul downloaded_youtube_videos contine toate videoclipurile descarcate de pe youtube, care au avut linkul introdus ca input in programul de diarizare. Intreg folderul "Diarization folder" functioneaza si ca o baza de date
locala, stocand informatii si despre mp3-urile descarcate, wav-urile ce le corespund, fisierele text si rttm ce
corespund diarizarii.