export default async function handler(req, res) {
    const { tracking_id } = req.query;
    
    // Your Wispbyte Server IP
    const wispByteIP = "http://85.215.131.70:15124";

    try {
        // FIXED: Pointing to /api/check instead of the .php file
        const response = await fetch(`${wispByteIP}/api/check?tracking_id=${tracking_id}`);

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status} ${response.statusText}`);
        }

        const text = await response.text();

        try {
            const data = JSON.parse(text);
            res.status(200).json(data);
        } catch (e) {
            throw new Error(`Invalid JSON: ${text.substring(0, 100)}...`);
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            target: wispByteIP
        });
    }
}
