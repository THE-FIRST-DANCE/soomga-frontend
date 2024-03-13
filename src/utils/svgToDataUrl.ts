export const svgToDataUrl = (svg: string) => {
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')
  const header = 'data:image/svg+xml,'
  return header + encoded
}
