exports.handler = async (event) => {
    // POST만 허용
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다.' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const messages = body.messages;
        const max_tokens = Math.min(body.max_tokens || 10, 2000);
        const temperature = body.max_tokens ? 0.7 : 0;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                max_tokens,
                temperature
            })
        });

        const data = await response.json();

        return {
            statusCode: response.ok ? 200 : response.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};
