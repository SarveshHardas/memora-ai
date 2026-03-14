interface YouTubeChannelInfo {
  channelId: string;
  handle: string | undefined;
  title: string;
}

export async function getChannelInfo(accessToken: string): Promise<YouTubeChannelInfo | null> {
  const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,id&mine=true';

  try {
    console.log("Token being sent:", accessToken.substring(0, 10) + "...");
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YouTube API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      
      return {
        channelId: channel.id,
        handle: channel.snippet.customUrl, 
        title: channel.snippet.title
      };
    }
    
    return null;
  } catch (error) {
    throw error;
  }
}