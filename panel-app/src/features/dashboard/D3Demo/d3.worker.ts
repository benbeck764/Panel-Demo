export const drawPath = (
  dataString: string,
  width: number,
  height: number,
  color: string
): ImageData | undefined => {
  console.log("Worker function invoked");
  const offscreenCanvas = new OffscreenCanvas(width, height);
  const context = offscreenCanvas.getContext("2d");
  if (!context) return;

  // Begin a new path
  context.beginPath();

  const regex = /([a-zA-Z])([-.\d]+),([-.\d]+)/g;
  let match;

  while ((match = regex.exec(dataString)) !== null) {
    const command = match[1];
    const x = parseFloat(match[2]);
    const y = parseFloat(match[3]);

    switch (command) {
      case "M":
        context.moveTo(x, y);
        break;
      case "L":
        context.lineTo(x, y);
        break;
      // Add more cases for other commands if needed
    }
  }

  // Stroke or fill the path
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.stroke();

  return context.getImageData(
    0,
    0,
    offscreenCanvas.width,
    offscreenCanvas.height
  );
};
