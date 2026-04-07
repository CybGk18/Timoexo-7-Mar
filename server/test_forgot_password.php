<?php
/**
 * Test Forgot Password Functionality
 * Simple script to test the forgot password feature
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test Forgot Password</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .button { padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .success { color: green; }
        .error { color: red; }
        .info { color: blue; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Test Forgot Password Feature</h1>
    
    <div class="section">
        <h2>Frontend Test</h2>
        <p>Test the forgot password functionality by making a direct API call:</p>
        <button id="testForgotPassword" class="button">Test Forgot Password API</button>
        <div id="result" style="margin-top: 10px;"></div>
    </div>

    <script>
        document.getElementById('testForgotPassword').addEventListener('click', async function() {
            const resultDiv = document.getElementById('result');
            const button = this;
            
            button.disabled = true;
            button.textContent = 'Testing...';
            resultDiv.innerHTML = '<p class="info">Sending request...</p>';
            
            try {
                const response = await fetch('/server/auth-admin.php?action=forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `<p class="success">✓ Success: ${data.message}</p>`;
                } else {
                    resultDiv.innerHTML = `<p class="error">✗ Error: ${data.message}</p>`;
                }
                
                resultDiv.innerHTML += `<p><strong>HTTP Status:</strong> ${response.status}</p>`;
                resultDiv.innerHTML += `<p><strong>Response:</strong> <pre>${JSON.stringify(data, null, 2)}</pre></p>`;
                
            } catch (error) {
                resultDiv.innerHTML = `<p class="error">✗ Network Error: ${error.message}</p>`;
            }
            
            button.disabled = false;
            button.textContent = 'Test Forgot Password API';
        });
    </script>
</body>
</html>