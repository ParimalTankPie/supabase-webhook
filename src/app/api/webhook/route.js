
export async function POST(req) {
  try {
    const { event, data } = await req.json();

    // Process the event and data
    console.log('Webhook event:', event);
    console.log('Data:', data);

    return new Response(
      JSON.stringify({ message: 'Webhook received successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(
      JSON.stringify({ message: 'Error processing webhook' }),
      { status: 500 }
    );
  }
}
