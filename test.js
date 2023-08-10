import fs from "fs";
import pdfjs from "pdfjs-dist";

// Function to read the contents of a PDF file
async function extractTextFromPDF(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjs.getDocument(data);
  const pdfDocument = await loadingTask.promise;

  const extractedText = [];
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    extractedText.push(pageText);
  }

  return extractedText.join("\n");
}

const pdfFilePath = "example.pdf"; // Provide your PDF file path here

extractTextFromPDF(pdfFilePath)
  .then((extractedText) => {
    console.log("Extracted Text:");
    console.log(extractedText);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
