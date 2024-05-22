import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'
import RegionsPlugin from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7.7.13/dist/plugins/regions.esm.js'
import Minimap from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7.7.13/dist/plugins/minimap.esm.js'


function fetchRttmWavTxt(data) {
    fetch(`http://127.0.0.1:5000/get_wav/${encodeURIComponent(data["wav_path"])}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const ws = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: url,
                plugins: [
                    // Register the plugin
                    Minimap.create({
                        height: 20,
                        waveColor: '#ddd',
                        progressColor: '#999',
                        // the Minimap takes all the same options as the WaveSurfer itself
                    }),
                ],
            });
            const wsRegions = ws.registerPlugin(RegionsPlugin.create());
            const random = (min, max) => Math.random() * (max - min) + min
            const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`
            ws.on('decode', () => {

                fetch(`http://127.0.0.1:5000/get_txt/${encodeURIComponent(data["txt_path_audacity"])}`)
                    .then(response => response.text())
                    .then(txtData => {
                        const lines = txtData.split('\n');
                        addSpeakersInputs(lines);
                        lines.forEach(line => {
                            const [start, end, label] = line.split('\t');
                            console.log("label")
                            wsRegions.addRegion({
                                start: parseFloat(start),
                                end: parseFloat(end),
                                content: label,
                                color: randomColor(),
                                resize: true,
                                drag: true,
                                show: true
                            });

                        });
                    })
                    .catch(error => console.error('Error fetching TXT file:', error));

                const playButton = document.querySelector('.play-button');
                playButton.addEventListener('click', () => {
                    ws.play();
                });

                const pauseButton = document.querySelector('.pause-button');
                pauseButton.addEventListener('click', () => {
                    ws.pause();
                });


            });

            wsRegions.enableDragSelection({
                color: 'rgba(255, 0, 0, 0.1)',
            })

            wsRegions.on('region-updated', (region) => {
                console.log('Updated region', region)
            })

            let loop = true
            document.querySelector('input[type="checkbox"]').onclick = (e) => {
                loop = e.target.checked
            }

            {
                let activeRegion = null
                wsRegions.on('region-in', (region) => {
                    console.log('region-in', region)
                    activeRegion = region
                })
                wsRegions.on('region-out', (region) => {
                    console.log('region-out', region)
                    if (activeRegion === region) {
                        if (loop) {
                            region.play()
                        } else {
                            activeRegion = null
                        }
                    }
                })
                wsRegions.on('region-clicked', (region, e) => {
                    e.stopPropagation()
                    activeRegion = region
                    region.play()
                    region.setOptions({ color: randomColor() })
                })

                ws.on('interaction', () => {
                    activeRegion = null
                })
            }

            ws.once('decode', () => {
                document.querySelector('input[type="range"]').oninput = (e) => {
                    const minPxPerSec = Number(e.target.value)
                    ws.zoom(minPxPerSec)
                }
            })
        })
        .catch(error => console.error('Error fetching WAV file:', error));
}

function fetchYouTubeLink(link) {
    return new Promise((resolve, reject) => {
        var url = 'http://127.0.0.1:5000/process_video';
        var requestData = {
            youtube_link: link
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                resolve(data);
                // Fetch and process the WAV file
                fetchRttmWavTxt(data)
            })
            .catch(error => {
                reject(error);
                console.error('Error:', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.diarization-button');
    var input = document.querySelector('.youtube-video-input');

    button.addEventListener('click', function () {
        var inputValue = input.value;

        fetchYouTubeLink(inputValue)
            .then(data => {
                console.log(data["rttm_path"])
                fetch(`http://127.0.0.1:5000/get_rttm/${encodeURIComponent(data["rttm_path"])}`)
                    .then(response => response.blob())
                    .then(rttmBlob => {
                        // Process the RTTM file as needed
                        console.log('RTTM file fetched successfully');
                        const downloadButton = document.createElement('button');
                        console.log('im hereeeeeeeeeeeee1')
                        downloadButton.textContent = 'Download RTTM';
                        downloadButton.style.padding = '10px 20px';
                        downloadButton.style.backgroundColor = '#4CAF50'; // Green color
                        downloadButton.style.color = 'white';
                        downloadButton.style.border = 'none';
                        downloadButton.style.borderRadius = '5px';
                        downloadButton.style.cursor = 'pointer';
                        downloadButton.addEventListener('click', function () {
                            // Trigger download
                            const rttmUrl = URL.createObjectURL(rttmBlob);
                            const a = document.createElement('a');
                            a.href = rttmUrl;
                            a.download = data["rttm_path"];
                            console.log(data["rttm_path"])
                            a.click();
                        });
                        //document.body.appendChild(downloadButton);
                        document.querySelector('.center').appendChild(downloadButton);
                        console.log('im hereeeeeeeeeeeee2')

                    })
                    .catch(error => console.error('Error fetching RTTM file:', error));
                fetch(`http://127.0.0.1:5000/get_txt/${encodeURIComponent(data["txt_path_audacity"])}`)
                    .then(response => response.blob())
                    .then(rttmBlob => {
                        // Process the TXT file as needed
                        console.log('TXT file fetched successfully');
                        const downloadButtonTXT = document.createElement('button');
                        console.log('im hereeeeeeeeeeeee3')
                        downloadButtonTXT.textContent = 'Download TXT for audacity';
                        downloadButtonTXT.style.padding = '10px 20px';
                        downloadButtonTXT.style.backgroundColor = '#4CAF50'; // Green color
                        downloadButtonTXT.style.color = 'white';
                        downloadButtonTXT.style.border = 'none';
                        downloadButtonTXT.style.borderRadius = '5px';
                        downloadButtonTXT.style.cursor = 'pointer';
                        downloadButtonTXT.addEventListener('click', function () {
                            // Trigger download
                            const rttmUrl = URL.createObjectURL(rttmBlob);
                            const a = document.createElement('a');
                            a.href = rttmUrl;
                            a.download = data["txt_path_audacity"];
                            console.log(data["txt_path_audacity"])
                            a.click();
                        });
                        //document.body.appendChild(downloadButton);
                        document.querySelector('.center').appendChild(downloadButtonTXT);
                        console.log('im hereeeeeeeeeeeee4')

                    })
                    .catch(error => console.error('Error fetching TXT file:', error));
            })
            .catch(error => console.error('Error:', error));

        console.log('Input value:', inputValue);
        input.value = '';
    });

    document.getElementById('browse-and-upload-inputID').addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            // Check if the file is a WAV file
            if (file.type === 'audio/wav') {
                uploadFile(file);
            } else {
                alert('Please select a WAV file.');
            }
        }
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://127.0.0.1:5000/uploadWav', {  // Replace '/upload' with your backend upload URL
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                fetchRttmWavTxt(data)
                return data;
            })
            .then(data => {
                console.log(data["rttm_path"])
                fetch(`http://127.0.0.1:5000/get_rttm/${encodeURIComponent(data["rttm_path"])}`)
                    .then(response => response.blob())
                    .then(rttmBlob => {
                        // Process the RTTM file as needed
                        console.log('RTTM file fetched successfully');
                        const downloadButton = document.createElement('button');
                        console.log('im hereeeeeeeeeeeee1')
                        downloadButton.textContent = 'Download RTTM';
                        downloadButton.style.padding = '10px 20px';
                        downloadButton.style.backgroundColor = '#4CAF50'; // Green color
                        downloadButton.style.color = 'white';
                        downloadButton.style.border = 'none';
                        downloadButton.style.borderRadius = '5px';
                        downloadButton.style.cursor = 'pointer';
                        downloadButton.addEventListener('click', function () {
                            // Trigger download
                            const rttmUrl = URL.createObjectURL(rttmBlob);
                            const a = document.createElement('a');
                            a.href = rttmUrl;
                            a.download = data["rttm_path"];
                            console.log(data["rttm_path"])
                            a.click();
                        });
                        //document.body.appendChild(downloadButton);
                        document.querySelector('.center').appendChild(downloadButton);
                        console.log('im hereeeeeeeeeeeee2')

                    })
                    .catch(error => console.error('Error fetching RTTM file:', error));
                fetch(`http://127.0.0.1:5000/get_txt/${encodeURIComponent(data["txt_path_audacity"])}`)
                    .then(response => response.blob())
                    .then(rttmBlob => {
                        // Process the TXT file as needed
                        console.log('TXT file fetched successfully');
                        const downloadButtonTXT = document.createElement('button');
                        console.log('im hereeeeeeeeeeeee3')
                        downloadButtonTXT.textContent = 'Download TXT for audacity';
                        downloadButtonTXT.style.padding = '10px 20px';
                        downloadButtonTXT.style.backgroundColor = '#4CAF50'; // Green color
                        downloadButtonTXT.style.color = 'white';
                        downloadButtonTXT.style.border = 'none';
                        downloadButtonTXT.style.borderRadius = '5px';
                        downloadButtonTXT.style.cursor = 'pointer';
                        downloadButtonTXT.addEventListener('click', function () {
                            // Trigger download
                            const rttmUrl = URL.createObjectURL(rttmBlob);
                            const a = document.createElement('a');
                            a.href = rttmUrl;
                            a.download = data["txt_path_audacity"];
                            console.log(data["txt_path_audacity"])
                            a.click();
                        });
                        //document.body.appendChild(downloadButton);
                        document.querySelector('.center').appendChild(downloadButtonTXT);
                        console.log('im hereeeeeeeeeeeee4')

                    })
                    .catch(error => console.error('Error fetching TXT file:', error));
            })


            .catch(error => {
                console.error('Error uploading file:', error);
            });
    }



});

function addSpeakersInputs(lines) {
    const a = new Set();
    lines.forEach(line => {
        const [start, end, label] = line.split('\t');
        a.add(line);
    })
    console.log(a);

}