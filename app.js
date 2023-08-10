document.getElementById('submitButton').addEventListener('click', async function() {
    const formData = new FormData(document.getElementById('uploadForm'));

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.text();
        document.getElementById('result').textContent = data;
    } catch (error) {
        console.error('Error:', error);
    }
});
