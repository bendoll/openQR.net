const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const qrCanvas = document.getElementById("qrCanvas");
const inputText = document.getElementById("inputText");
const imageSizeSelect = document.getElementById("imageSizeSelect");
const fileFormatSelect = document.getElementById("fileFormatSelect");
const downloadOptions = document.getElementById("downloadOptions");

generateBtn.addEventListener("click", () => {
  const text = inputText.value;

  // Clear previous QR code
  qrCanvas.style.display = "none";

  if (text.trim()) {
    // Generate QR code on canvas
    QRCode.toCanvas(qrCanvas, text, { width: 256 }, (error) => {
      if (error) {
        console.error(error);
        alert(
          "Error generating QR Code. Please refresh the page and try again."
        );
      } else {
        qrCanvas.style.display = "block";
        downloadOptions.style.display = "flex";
        downloadLabel.style.display = "inline-block";
      }
    });
  } else {
    alert("Please enter some text or a URL.");
    downloadOptions.style.display = "none";
    downloadLabel.style.display = "none";
  }
});

fileFormatSelect.addEventListener("change", () => {
  fileFormatSelect.value === "png"
    ? (imageSizeSelect.style.display = "inline-block")
    : (imageSizeSelect.style.display = "none");
});

downloadBtn.addEventListener("click", () => {
  const selectedSize = parseInt(imageSizeSelect.value, 10); // Get the selected size
  const selectedFormat = fileFormatSelect.value; // Get the selected file format

  if (selectedFormat === "png") {
    // Create a temporary canvas for the download
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = selectedSize;
    tempCanvas.height = selectedSize;

    // Generate the QR code on the temporary canvas
    QRCode.toCanvas(
      tempCanvas,
      inputText.value,
      { width: selectedSize },
      (error) => {
        if (error) {
          console.error(error);
          alert(
            "Error generating the QR Code for download. Please refresh the page and try again."
          );
          return;
        }
        // Convert the temporary canvas to a PNG image and trigger download
        const link = document.createElement("a");
        link.href = tempCanvas.toDataURL("image/png");
        link.download =
          "openQR_" +
          getCurrentTimestamp() +
          "_" +
          selectedSize +
          "px" +
          ".png"; // Filename to download
        link.click();
      }
    );
  } else if (selectedFormat === "svg") {
    // Generate the QR code as an SVG
    QRCode.toString(
      inputText.value,
      { type: "svg", width: selectedSize },
      (error, svgString) => {
        if (error) {
          console.error(error);
          alert(
            "Error generating the QR Code for download. Please refresh the page and try again."
          );
          return;
        }

        // Create a Blob for the SVG and trigger download
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "openQR_" + getCurrentTimestamp() + ".svg"; // Filename to download
        link.click();
      }
    );
  }
});
