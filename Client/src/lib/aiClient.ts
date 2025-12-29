export type ChatRole = 'system' | 'user' | 'assistant';
export type ChatMessage = { role: ChatRole; content: string };

// Calls Ollama API (cloud or local) to generate a brief assistant reply.
// Configure with VITE_OLLAMA_URL, VITE_OLLAMA_MODEL, and VITE_OLLAMA_API_KEY
export async function chatWithLocalLLM(messages: ChatMessage[], opts?: { model?: string; baseUrl?: string }): Promise<string> {
  const base = opts?.baseUrl || (import.meta.env.VITE_OLLAMA_URL as string) || 'http://localhost:11434';
  const model = opts?.model || (import.meta.env.VITE_OLLAMA_MODEL as string) || 'llama3.1';
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY as string | undefined;
  
  console.log('🤖 Attempting Ollama API call:', { base, model, hasApiKey: !!apiKey });
  
  try {
    const headers: Record<string, string> = { 
      'Content-Type': 'application/json',
    };
    
    // Add authorization header if API key is provided (for Ollama Cloud)
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    const requestBody = {
      model,
      messages,
      stream: false,
    };
    
    console.log('📤 Request:', JSON.stringify({ url: `${base}/api/chat`, headers, body: requestBody }, null, 2));
    
    const res = await fetch(`${base}/api/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
    
    console.log('📥 Response status:', res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`Ollama API error (${res.status}):`, errorText);
      return '';
    }
    
    const data = await res.json();
    console.log('✅ Response data:', data);
    
    // Ollama returns { message: { content }, ... }
    const content = data?.message?.content ?? '';
    return typeof content === 'string' ? content.trim() : '';
  } catch (error) {
    console.error('❌ Error calling Ollama API:', error);
    return '';
  }
}

// Generic AI chat helper that supports multiple providers.
// Set provider via VITE_AI_PROVIDER: 'openai' | 'ollama' (default: 'openai')
// OpenAI: VITE_OPENAI_URL, VITE_OPENAI_API_KEY, VITE_OPENAI_MODEL (default: 'gpt-5.1-codex-max')
// Ollama: VITE_OLLAMA_URL, VITE_OLLAMA_API_KEY, VITE_OLLAMA_MODEL
export async function chatWithAI(
  messages: ChatMessage[],
  opts?: { model?: string; baseUrl?: string; provider?: 'openai' | 'ollama' }
): Promise<string> {
  // Prefer server-side proxy if available
  const proxyUrl = (import.meta.env.VITE_AI_PROXY_URL as string | undefined);
  if (proxyUrl) {
    try {
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, model: opts?.model }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn(`AI proxy error (${res.status}):`, text);
        // fall through to direct provider
      } else {
        const data = await res.json();
        const content = data?.content ?? '';
        return typeof content === 'string' ? content.trim() : '';
      }
    } catch (e) {
      console.warn('AI proxy fetch failed; falling back to direct provider', e);
    }
  }
  const provider = opts?.provider || (import.meta.env.VITE_AI_PROVIDER as 'openai' | 'ollama') || 'openai';

  if (provider === 'ollama') {
    // Delegate to Ollama client
    return chatWithLocalLLM(messages, { model: opts?.model, baseUrl: opts?.baseUrl });
  }

  // Default: OpenAI-compatible Chat Completions API
  const base = opts?.baseUrl || (import.meta.env.VITE_OPENAI_URL as string) || 'https://api.openai.com/v1';
  const model = opts?.model || (import.meta.env.VITE_OPENAI_MODEL as string) || 'gpt-5.1-codex-max';
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  if (!apiKey) {
    console.warn('OpenAI API key is missing. Set VITE_OPENAI_API_KEY.');
    return '';
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    // Map messages to OpenAI format
    const body = {
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.7,
    };

    console.log('📤 OpenAI request:', JSON.stringify({ url: `${base}/chat/completions`, model }, null, 2));

    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    console.log('📥 OpenAI status:', res.status, res.statusText);

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`OpenAI API error (${res.status}):`, errorText);
      return '';
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    return typeof content === 'string' ? content.trim() : '';
  } catch (error) {
    console.error('❌ Error calling OpenAI API:', error);
    return '';
  }
}
