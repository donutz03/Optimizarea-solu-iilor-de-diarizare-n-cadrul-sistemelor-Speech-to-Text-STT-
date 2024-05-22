// import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'
// import RegionsPlugin from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7.7.13/dist/plugins/regions.esm.js'



// function fetchYouTubeLink(link) {
//     var url = 'http://127.0.0.1:5000/process_video';
//     var requestData = {
//         youtube_link: link
//     };

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestData)
//     })
//         .then(response => response.json())
//         .then(data => {
//             fetch(`http://127.0.0.1:5000/get_wav/${encodeURIComponent(data["wav_path"])}`)
//                 .then(response => response.blob())
//                 .then(blob => {

//                     const url = URL.createObjectURL(blob);

//                     const ws = WaveSurfer.create({
//                         container: '#waveform',
//                         waveColor: 'rgb(200, 0, 200)',
//                         progressColor: 'rgb(100, 0, 100)',
//                         url: url,
//                     })

//                     const wsRegions = ws.registerPlugin(RegionsPlugin.create())

//                     const random = (min, max) => Math.random() * (max - min) + min
//                     const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

//                     ws.on('decode', () => {

//                         wsRegions.addRegion({
//                             start: 0,
//                             end: 8,
//                             content: 'Resize me',
//                             color: randomColor(),
//                             drag: false,
//                             resize: true,
//                         })
//                         wsRegions.addRegion({
//                             start: 9,
//                             end: 10,
//                             content: 'Cramped region',
//                             color: randomColor(),
//                             minLength: 1,
//                             maxLength: 10,
//                         })
//                         wsRegions.addRegion({
//                             start: 12,
//                             end: 17,
//                             content: 'Drag me',
//                             color: randomColor(),
//                             resize: false,
//                         })


//                         wsRegions.addRegion({
//                             start: 19,
//                             content: 'Marker',
//                             color: randomColor(),
//                         })
//                         wsRegions.addRegion({
//                             start: 20,
//                             content: 'Second marker',
//                             color: randomColor(),
//                         })
//                     })

//                     wsRegions.enableDragSelection({
//                         color: 'rgba(255, 0, 0, 0.1)',
//                     })

//                     wsRegions.on('region-updated', (region) => {
//                         console.log('Updated region', region)
//                     })

//                     let loop = true

//                     document.querySelector('input[type="checkbox"]').onclick = (e) => {
//                         loop = e.target.checked
//                     }

//                     {
//                         let activeRegion = null
//                         wsRegions.on('region-in', (region) => {
//                             console.log('region-in', region)
//                             activeRegion = region
//                         })
//                         wsRegions.on('region-out', (region) => {
//                             console.log('region-out', region)
//                             if (activeRegion === region) {
//                                 if (loop) {
//                                     region.play()
//                                 } else {
//                                     activeRegion = null
//                                 }
//                             }
//                         })
//                         wsRegions.on('region-clicked', (region, e) => {
//                             e.stopPropagation()
//                             activeRegion = region
//                             region.play()
//                             region.setOptions({ color: randomColor() })
//                         })

//                         ws.on('interaction', () => {
//                             activeRegion = null
//                         })
//                     }

//                     ws.once('decode', () => {
//                         document.querySelector('input[type="range"]').oninput = (e) => {
//                             const minPxPerSec = Number(e.target.value)
//                             ws.zoom(minPxPerSec)
//                         }
//                     })
//                 })
//                 .catch(error => console.error('Error fetching WAV file:', error));
//         })
//         .catch(error => console.error('Error:', error));





// }

// document.addEventListener('DOMContentLoaded', function () {
//     var button = document.querySelector('.diarization-button');
//     var input = document.querySelector('.youtube-video-input');

//     button.addEventListener('click', function () {
//         var inputValue = input.value;

//         fetchYouTubeLink(inputValue);

//         console.log('Input value:', inputValue);

//         input.value = '';
//     });
// });