import type { Request, Response } from 'express';
import { z } from 'zod';

const ChatRoleSchema = z.union([
  z.literal('system'),
  z.literal('user'),
  z.literal('assistant'),
]);

const ChatMessageSchema = z.object({
  role: ChatRoleSchema,
  content: z.string().min(1),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1),
  model: z.string().optional(),
});

export async function chatAI(req: Request, res: Response) {
  const parse = ChatRequestSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid request body', details: parse.error.flatten() });
  }

  const { messages, model } = parse.data;

  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();

  try {
    if (provider === 'ollama') {
      const base = process.env.OLLAMA_URL || 'http://localhost:11434';
      const ollamaModel = model || process.env.OLLAMA_MODEL || 'llama3.1';
      const apiKey = process.env.OLLAMA_API_KEY;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

      const response = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model: ollamaModel, messages, stream: false }),
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(response.status).json({ error: 'Ollama error', details: text });
      }

      const data = (await response.json()) as any;
      const content = data?.message?.content ?? '';
      return res.json({ content });
    }

    // Default: OpenAI-compatible Chat Completions API
    const base = process.env.OPENAI_URL || 'https://api.openai.com/v1';
    const openaiModel = model || process.env.OPENAI_MODEL || 'gpt-5.1-codex-max';
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY on server' });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const body = {
      model: openaiModel,
      messages,
      temperature: 0.7,
    };

    const response = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'OpenAI error', details: text });
    }

    const data = (await response.json()) as any;
    const content: string = data?.choices?.[0]?.message?.content ?? '';
    return res.json({ content });
  } catch (err) {
    console.error('AI proxy error:', err);
    return res.status(500).json({ error: 'AI proxy failed' });
  }
}
