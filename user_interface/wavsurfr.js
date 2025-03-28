

// Create an instance of WaveSurfer


// Initialize the Regions plugin
const wsRegions = ws.registerPlugin(RegionsPlugin.create())

// Give regions a random color when they are created
const random = (min, max) => Math.random() * (max - min) + min
const randomColor = () => `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`

// Create some regions at specific time ranges
ws.on('decode', () => {
  // Regions
  wsRegions.addRegion({
    start: 0,
    end: 8,
    content: 'Resize me',
    color: randomColor(),
    drag: false,
    resize: true,
  })
  wsRegions.addRegion({
    start: 9,
    end: 10,
    content: 'Cramped region',
    color: randomColor(),
    minLength: 1,
    maxLength: 10,
  })
  wsRegions.addRegion({
    start: 12,
    end: 17,
    content: 'Drag me',
    color: randomColor(),
    resize: false,
  })

  // Markers (zero-length regions)
  wsRegions.addRegion({
    start: 19,
    content: 'Marker',
    color: randomColor(),
  })
  wsRegions.addRegion({
    start: 20,
    content: 'Second marker',
    color: randomColor(),
  })
})

wsRegions.enableDragSelection({
  color: 'rgba(255, 0, 0, 0.1)',
})

wsRegions.on('region-updated', (region) => {
  console.log('Updated region', region)
})

// Loop a region on click
let loop = true
// Toggle looping with a checkbox
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
    e.stopPropagation() // prevent triggering a click on the waveform
    activeRegion = region
    region.play()
    region.setOptions({ color: randomColor() })
  })
  // Reset the active region when the user clicks anywhere in the waveform
  ws.on('interaction', () => {
    activeRegion = null
  })
}

// Update the zoom level on slider change
ws.once('decode', () => {
  document.querySelector('input[type="range"]').oninput = (e) => {
    const minPxPerSec = Number(e.target.value)
    ws.zoom(minPxPerSec)
  }
})
