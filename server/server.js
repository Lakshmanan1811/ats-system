// server.js
import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import path from "path"; // Import the 'path' module

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public")); // Serve static files (e.g., your HTML file)

// Define a route to serve the "finalpage.html"
app.get("/", (req, res) => {
  const finalPagePath = new URL("finalpage.html", import.meta.url).pathname;
  res.sendFile(
    path.join(path.dirname(finalPagePath), "public", "finalpage.html")
  );
});

app.post("/upload", upload.single("resume"), (req, res) => {
  const pythonProcess = spawn("node", ["resume-ranking.js"]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.send("Processing completed");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
