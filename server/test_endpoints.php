<?php
/**
 * Quick Endpoint Test
 * Tests if auth-admin.php endpoints are working
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Auth Endpoint Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .button { padding: 10px 15px; background: #007cba; color: white; border: none; border-radius: 3px; cursor: pointer; margin: 5px; }
        .success { color: green; } .error { color: red; } .info { color: blue; }
        .result { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 3px; }
        pre { background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>Auth Endpoint Test</h1>
    
    <div style="margin: 20px 0;">
        <button class="button" onclick="testEndpoint('login')">Test Login Endpoint</button>
        <button class="button" onclick="testEndpoint('check')">Test Check Endpoint</button>
        <button class="button" onclick="testEndpoint('logout')">Test Logout Endpoint</button>
        <button class="button" onclick="testEndpoint('forgot-password')">Test Forgot Password Endpoint</button>
    </div>
    
    <div id="results"></div>

    <script>
        async function testEndpoint(action) {
            const resultsDiv = document.getElementById('results');
            
            // Create result container
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.innerHTML = `<h3>Testing ${action} endpoint...</h3>`;
            resultsDiv.appendChild(resultDiv);
            
            try {
                let body = {};
                if (action === 'login') {
                    body = { username: 'admin', password: 'admin123' };
                }
                
                const response = await fetch(`/server/auth-admin.php?action=${action}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
                });
                
                const responseText = await response.text();
                
                resultDiv.innerHTML = `
                    <h3>Results for ${action}:</h3>
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <p><strong>URL:</strong> ${response.url}</p>
                    <p><strong>Response:</strong></p>
                    <pre>${responseText}</pre>
                `;
                
                // Try to parse as JSON
                try {
                    const jsonData = JSON.parse(responseText);
                    resultDiv.innerHTML += `
                        <p><strong>Parsed JSON:</strong></p>
                        <pre>${JSON.stringify(jsonData, null, 2)}</pre>
                    `;
                } catch (e) {
                    resultDiv.innerHTML += `<p class="error">Response is not valid JSON</p>`;
                }
                
            } catch (error) {
                resultDiv.innerHTML = `
                    <h3>Error testing ${action}:</h3>
                    <p class="error">${error.message}</p>
                `;
            }
        }
    </script>
</body>
</html>