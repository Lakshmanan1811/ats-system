import fs from "fs";
import pdfjs from "pdfjs-dist";
import natural from "natural";
import { createTransport } from "nodemailer";
import { error, log } from "console";

let total = 0;
// Function to read the contents of a PDF file
async function extractInformationFromPDF(filePath) {
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

// Function to read the contents of a JSON file
function readJSON(filePath) {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

function rankMatches(extractedText, jobDescription) {
  const rankedMatches = [];
  for (const key in jobDescription) {
    if (jobDescription.hasOwnProperty(key)) {
      const value = jobDescription[key];
      if (typeof value === "string") {
        const similarity = natural.JaroWinklerDistance(
          extractedText.toLowerCase(),
          value.toLowerCase(),
          { ignoreCase: true }
        );
        const similarityScale10 = similarity * 100;
        rankedMatches.push({ key, similarity: similarityScale10 });
      } else {
        console.warn(`Warning: Value for attribute "${key}" is not a string.`);
      }
    }
  }
  rankedMatches.sort((a, b) => b.similarity - a.similarity);

  return rankedMatches;
}
const pdfFilePath = "resume.pdf";
const jobDescriptionFilePath = "resume.json";

Promise.all([
  extractInformationFromPDF(pdfFilePath),
  readJSON(jobDescriptionFilePath),
]).then(([extractedText, jobDescription]) => {
  // Rank the extracted information against the job description
  const rankedMatches = rankMatches(extractedText, jobDescription);
  // Display the ranked matches
  console.log("Ranked Matches:");
  rankedMatches.forEach((match, index) => {
    console.log(
      `${index + 1}. Attribute: ${match.key}, Similarity: ${match.similarity}`
    );
    total += match.similarity;
  });
  if (total > 350) {
    emailAutomation();
  }
});

//email automation

const emailAutomation = function () {

  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "manibharathiinreallife@gmail.com",
      pass: "TLx62k8MDXJrRzCI",
    },
  });

  const mailOptions = {
    from: "manibharathiinreallife@gmail.com",
    to: "ashikcsbtech@gmail.com",
    subject: `Invitation to the Next Round of Interview Process`,
    text: `

    Dear Candidate,
    
    We hope this message finds you well. We are pleased to inform you that your resume has been shortlisted for the next round of our interview process for the [Job Title] position at [Company Name].
    
    Here are the details for the upcoming round:
    
    
    Please be prepared for: Communication test

    REQUIREMENTS: Proper internet connection, Avoid background noises and do the test in the peaceful place.
    
    We are excited to continue the evaluation process with you. If you have any questions or require further information, please feel free to reply to this email.
    
    We appreciate your interest in joining our team and look forward to meeting you for the next round.
    
    Best regards,
    Lakshmanan,
    Software Engineer
    Axis Bank
    velakshman@gmail.com    
    Remember to keep the email professional, courteous, and informative to create a positive candidate experience.    
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent Successfully: " + info.response);
    }
  });
};
