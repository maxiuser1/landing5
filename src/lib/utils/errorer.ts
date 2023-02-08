export const handlee = async (error: any) => {
    const resp = await fetch('/api/ehan', {
        method: 'POST',
        body: error,
        headers: {
            'content-type': 'application/json'
        }
    });
    await resp.json();
}