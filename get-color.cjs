const sharp = require('sharp');

sharp('public/hyperspace-logo.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const counts = {};
    for (let i = 0; i < data.length; i += info.channels) {
      if (info.channels === 4 && data[i + 3] === 0) continue; // skip transparent
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Grouping colors somewhat to find dominant colors
      const rG = Math.round(r / 10) * 10;
      const gG = Math.round(g / 10) * 10;
      const bG = Math.round(b / 10) * 10;
      const hex = `#${rG.toString(16).padStart(2,'0')}${gG.toString(16).padStart(2,'0')}${bG.toString(16).padStart(2,'0')}`;
      
      counts[hex] = (counts[hex] || 0) + 1;
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    console.log("Top colors:", sorted);
    
    // Exact colors
    const exactCounts = {};
    for (let i = 0; i < data.length; i += info.channels) {
      if (info.channels === 4 && data[i + 3] < 128) continue; // skip transparent
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
      exactCounts[hex] = (exactCounts[hex] || 0) + 1;
    }
    const exactSorted = Object.entries(exactCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    console.log("Top exact colors:", exactSorted);
  })
  .catch(console.error);
