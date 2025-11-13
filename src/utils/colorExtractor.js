/**
 * Lightweight color extraction utility
 * Extracts dominant colors from images using canvas sampling
 */

// RGB to Hex conversion
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

// Calculate color distance
function colorDistance(c1, c2) {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  )
}

// Map RGB to color name
function getColorName(r, g, b) {
  const colors = {
    Coral: { r: 255, g: 107, b: 107 },
    Blush: { r: 232, g: 180, b: 184 },
    Rose: { r: 201, g: 129, b: 143 },
    Lavender: { r: 184, g: 167, b: 201 },
    Gold: { r: 212, g: 175, b: 103 },
    Olive: { r: 149, g: 180, b: 106 },
    Slate: { r: 112, g: 125, b: 136 },
    Navy: { r: 44, g: 62, b: 80 },
    Cream: { r: 250, g: 247, b: 242 },
    Ink: { r: 44, g: 44, b: 44 },
    Mauve: { r: 153, g: 102, b: 153 },
    Sage: { r: 154, g: 179, b: 161 },
    Terracotta: { r: 204, g: 102, b: 102 },
    Denim: { r: 86, g: 108, b: 140 },
  }

  let closestColor = 'Gray'
  let minDistance = Infinity

  Object.entries(colors).forEach(([name, rgb]) => {
    const distance = colorDistance({ r, g, b }, rgb)
    if (distance < minDistance) {
      minDistance = distance
      closestColor = name
    }
  })

  return closestColor
}

/**
 * Extract dominant colors from an image
 * @param {File|string} imageSource - Image file or URL
 * @param {number} sampleSize - Number of pixels to sample (default: 1000)
 * @returns {Promise<Array>} Array of color names
 */
export async function extractColors(imageSource, sampleSize = 1000) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      // Set canvas size
      const maxSize = 200 // Downscale for performance
      const scale = Math.min(maxSize / img.width, maxSize / img.height)
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data

      // Sample pixels
      const colorCounts = {}
      const step = Math.floor(pixels.length / (sampleSize * 4))

      for (let i = 0; i < pixels.length; i += step * 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        const a = pixels[i + 3]

        // Skip transparent or near-white/black pixels
        if (a < 128) continue
        if (r > 240 && g > 240 && b > 240) continue
        if (r < 15 && g < 15 && b < 15) continue

        const colorName = getColorName(r, g, b)
        colorCounts[colorName] = (colorCounts[colorName] || 0) + 1
      }

      // Get top 3 colors
      const topColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([color]) => color)

      resolve(topColors)
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Handle different input types
    if (typeof imageSource === 'string') {
      img.src = imageSource
    } else if (imageSource instanceof File) {
      const reader = new FileReader()
      reader.onload = (e) => {
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(imageSource)
    } else {
      reject(new Error('Invalid image source'))
    }
  })
}

/**
 * Extract colors from base64 image data
 * @param {string} base64Data - Base64 encoded image
 * @returns {Promise<Array>} Array of color names
 */
export function extractColorsFromBase64(base64Data) {
  return extractColors(base64Data)
}
