import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { submitContactForm } from '../lib/serviceApi';
import { chatWithAI, type ChatMessage as ModelMessage } from '../lib/aiClient';

type Lead = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  created_at?: string;
};

type Role = 'bot' | 'user';
type ChatMessage = { id: string; role: Role; text: string; ts: number };

enum Step {
  Greet = 'Greet',
  GetName = 'GetName',
  GetContactChoice = 'GetContactChoice',
  GetEmail = 'GetEmail',
  GetPhone = 'GetPhone',
  GetMessage = 'GetMessage',
  Confirm = 'Confirm',
  Done = 'Done',
}



const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /[0-9]{7,}/.test(phone.replace(/\D/g, ''));

const FloatingBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<Step>(Step.Greet);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState(false);
  const [leadDraft, setLeadDraft] = useState<Lead>({ name: '', email: undefined, phone: undefined, message: undefined });
  const chatEndRef = useRef<HTMLDivElement | null>(null);



  useEffect(() => {
    // Optionally open once per session after delay
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('olatus_bot_seen')) {
        setOpen(true);
        sessionStorage.setItem('olatus_bot_seen', '1');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      // Seed conversation
      enqueueBot("Hey there! 👋 I'm your Olatus AI Assistant.");
      setTimeout(() => {
        enqueueBot("I'm here to help you with AI solutions, software development, and tech consulting. What's your name?");
        setStep(Step.GetName);
      }, 800);
    }
    // Intentionally not depending on messages state changes to avoid reseeding; check length in body instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const enqueueBot = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role: 'bot', text, ts: Date.now() }]);
  };

  const enqueueUser = (text: string) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role: 'user', text, ts: Date.now() }]);
  };

  const submitLead = async (lead: Lead) => {
    setSubmitting(true);
    try {
      const nameParts = lead.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '.'; // Backend might trim, so '.' ensures non-empty if strictly required, but ' ' might be trimmed to empty.

      await submitContactForm({
        firstName,
        lastName: lastName === '.' ? '' : lastName, // Actually, let's just send what we have. If lastName is empty, serviceApi joins them.
        email: lead.email || `no-email-${Date.now()}@olatus.com`,
        phone: lead.phone,
        message: lead.message || 'Chatbot Inquiry',
        subject: 'Chatbot Lead'
      });

      enqueueBot('Thanks! Your details are saved. Our team will reach out soon.');
      setStep(Step.Done);
    } catch (err: unknown) {
      console.error(err);
      enqueueBot('Sorry, something went wrong saving your details. You can try again or share later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserInput = async () => {
    const text = input.trim();
    if (!text || submitting) return;
    setError(null);
    setInput('');
    setAiHint(false);
    enqueueUser(text);

    // Small delay for realism
    await new Promise((r) => setTimeout(r, 300));

    // Check if user is asking a question about services
    const lower = text.toLowerCase();
    const isAboutServices = lower.includes('what') || lower.includes('service') || lower.includes('do you') ||
      lower.includes('can you') || lower.includes('help') || lower.includes('offer') ||
      lower.includes('provide') || lower.includes('about') || lower.includes('olatus');

    if (isAboutServices && step !== Step.Confirm && step !== Step.Done) {
      // Smart response about Olatus services
      let response = '';

      if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) {
        response = "Awesome! We specialize in AI/ML solutions - from custom models to intelligent automation. We build smart systems that learn and adapt to your business needs.";
      } else if (lower.includes('web') || lower.includes('app') || lower.includes('mobile')) {
        response = "Great! We develop cutting-edge web and mobile applications. Whether you need a responsive website, mobile app, or full-stack solution, we've got you covered!";
      } else if (lower.includes('cloud') || lower.includes('devops')) {
        response = "Perfect timing! We provide cloud architecture, migration, and DevOps solutions to scale your business efficiently and securely.";
      } else if (lower.includes('data') || lower.includes('analytics')) {
        response = "Excellent! We offer data analytics and visualization services to help you make data-driven decisions and uncover valuable insights.";
      } else {
        response = "Great question! 🚀 Olatus provides:\n\n✨ AI/ML Development\n💻 Custom Software Solutions\n📱 Web & Mobile Apps\n☁️ Cloud Services & DevOps\n📊 Data Analytics\n🔧 IT Consulting\n\nWe turn your ideas into innovative tech solutions!";
      }

      enqueueBot(response);
      await new Promise((r) => setTimeout(r, 600));

      // Continue with the flow based on current step
      if (step === Step.GetName) {
        enqueueBot("I'd love to help you more! Can I get your name first?");
        return;
      } else if (step === Step.GetContactChoice) {
        enqueueBot("So our team can reach out with more details, would you prefer email or phone?");
        return;
      } else if (step === Step.GetPhone) {
        enqueueBot("Sounds good! What's your phone number?");
        return;
      } else if (step === Step.GetEmail) {
        enqueueBot("Perfect! What's your email address?");
        return;
      }
      return;
    }

    // Generic Q&A via AI when not in confirmation/done steps and not collecting contact fields
    const looksGeneralQuestion = lower.includes('?') || /\b(what|how|why|explain|tell me|difference|compare|guide|help)\b/.test(lower);
    const collectingContact = [Step.GetName, Step.GetContactChoice, Step.GetEmail, Step.GetPhone, Step.GetMessage, Step.Confirm].includes(step);
    if (looksGeneralQuestion && !collectingContact) {
      try {
        setAiLoading(true);
        const messages: ModelMessage[] = [
          { role: 'system', content: 'You are the Olatus AI assistant. Answer clearly and concisely.' },
          { role: 'user', content: text }
        ];
        const answer = await chatWithAI(messages);
        enqueueBot(answer || "I'm here to help! Could you rephrase your question?");
      } catch (e) {
        enqueueBot('Sorry, I could not fetch an AI answer right now.');
      } finally {
        setAiLoading(false);
      }
      return;
    }

    switch (step) {
      case Step.GetName: {
        if (text.length < 2) {
          enqueueBot("That seems a bit short! What's your full name? 😊");
          return;
        }
        const nextLead = { ...leadDraft, name: text };
        setLeadDraft(nextLead);

        // Friendly greeting variations
        const greetings = [
          `Nice to meet you, ${text}! 😊 How would you like us to reach you—email or phone?`,
          `Great to connect, ${text}! Would you prefer we contact you by email or phone?`,
          `Thanks ${text}! So our team can follow up, would you prefer email or phone?`,
          `Pleasure meeting you, ${text}! Should we reach you via email or phone?`
        ];

        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        enqueueBot(randomGreeting);
        setStep(Step.GetContactChoice);
        return;
      }
      case Step.GetContactChoice: {
        const looksEmail = validateEmail(text);
        const digits = text.replace(/\D/g, '');
        const looksPhone = digits.length >= 7;

        // Check if switching from phone to email
        const wantsEmail = lower.includes('email') || lower.includes('mail') || looksEmail;
        const wantsPhone = lower.includes('phone') || lower.includes('call') || lower.includes('number') || looksPhone;

        if (wantsEmail) {
          enqueueBot("Perfect! What's your email address?");
          setStep(Step.GetEmail);
          if (looksEmail) {
            // Auto-handle if they pasted email directly
            const nextLead = { ...leadDraft, email: text };
            setLeadDraft(nextLead);
            enqueueBot('Got it! Want to tell me a bit about what you need? (or type "skip")');
            setStep(Step.GetMessage);
          }
          return;
        }
        if (wantsPhone) {
          enqueueBot("Great! What's your phone number?");
          setStep(Step.GetPhone);
          if (looksPhone) {
            const nextLead = { ...leadDraft, phone: text };
            setLeadDraft(nextLead);
            enqueueBot("Thanks! Want to tell me what you're looking for? (or type \"skip\")");
            setStep(Step.GetMessage);
          }
          return;
        }
        enqueueBot('No worries! Just say "email" or "phone", or paste your contact info directly. 😊');
        return;
      }
      case Step.GetEmail: {
        // Check if they want to switch to phone instead
        if (lower.includes('phone') || lower.includes('call') || lower.includes('number')) {
          enqueueBot("Sure! Let's go with phone instead. What's your number?");
          setStep(Step.GetPhone);
          return;
        }

        if (!validateEmail(text)) {
          enqueueBot("Hmm, that email doesn't look quite right. Could you double-check it? 😊");
          return;
        }
        const nextLead = { ...leadDraft, email: text };
        setLeadDraft(nextLead);
        enqueueBot('Awesome! Want to share a quick message about what you need? (or just type "skip")');
        setStep(Step.GetMessage);
        return;
      }
      case Step.GetPhone: {
        // Check if they want to switch to email instead
        if (lower.includes('email') || lower.includes('mail') || validateEmail(text)) {
          if (validateEmail(text)) {
            const nextLead = { ...leadDraft, email: text };
            setLeadDraft(nextLead);
            enqueueBot("Perfect! Got your email. Want to tell me what you're looking for? (or type \"skip\")");
            setStep(Step.GetMessage);
            return;
          }
          enqueueBot("Sure! Let's use email instead. What's your email address?");
          setStep(Step.GetEmail);
          return;
        }

        const digits = text.replace(/\D/g, '');
        if (!validatePhone(digits)) {
          enqueueBot('That number seems incomplete. Please share at least 7 digits with your country code. 😊');
          return;
        }
        const nextLead = { ...leadDraft, phone: text };
        setLeadDraft(nextLead);
        enqueueBot('Perfect! Want to share what brings you here today? (or type "skip")');
        setStep(Step.GetMessage);
        return;
      }
      case Step.GetMessage: {
        if (lower === 'skip' || lower === 'no' || lower === 'nope') {
          enqueueBot("No problem! Let me confirm your details:");
        }
        const nextLead = { ...leadDraft, message: (lower === 'skip' || lower === 'no') ? undefined : text };
        setLeadDraft(nextLead);

        const summary = `
📝 Your Details:
━━━━━━━━━━━━━━
👤 Name: ${nextLead.name}
${nextLead.email ? '📧 Email: ' + nextLead.email : ''}
${nextLead.phone ? '📱 Phone: ' + nextLead.phone : ''}
${nextLead.message ? '💬 Message: ' + nextLead.message : ''}
━━━━━━━━━━━━━━`;

        enqueueBot(summary);
        await new Promise((r) => setTimeout(r, 400));
        enqueueBot('Looks good? Should I send this to our team? (yes/no)');
        setStep(Step.Confirm);
        return;
      }
      case Step.Confirm: {
        if (['yes', 'y', 'ok', 'okay', 'sure', 'send', 'submit', 'go'].some((k) => lower.includes(k))) {
          const lead: Lead = { ...leadDraft };
          await submitLead(lead);
          return;
        }
        if (['no', 'n', 'wait', 'change', 'edit', 'update'].some((k) => lower.includes(k))) {
          enqueueBot('No problem! What would you like to change? You can update your name, email, phone, or message.');
          setStep(Step.GetContactChoice);
          return;
        }
        enqueueBot('Just reply with "yes" to send or "no" to make changes. 😊');
        return;
      }
      case Step.Done: {
        enqueueBot("Happy to help again! What's your name?");
        setLeadDraft({ name: '', email: undefined, phone: undefined, message: undefined });
        setStep(Step.GetName);
        return;
      }
      default:
        return;
    }
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <button
            aria-label="Open contact assistant"
            onClick={() => setOpen(true)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Bot size={26} />
            <span className="absolute -top-2 -left-2 px-2 py-0.5 text-[10px] rounded-full bg-white/90 text-gray-900 font-semibold shadow">Hi</span>
          </button>
        )}
      </div>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[92vw] bg-[#001a24]/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Olatus Assistant</div>
                <div className="text-cyan-300 text-[11px]">We’ll get back within 1 business day</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-gray-300 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`${m.role === 'bot' ? 'bg-[#002E3C]/60 backdrop-blur-sm border-cyan-500/20' : 'bg-gradient-to-br from-cyan-500 to-purple-600'} text-white border px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-line`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Composer */}
          <div className="px-4 pb-4 pt-2 border-t border-cyan-500/20 bg-[#001a24]/80 backdrop-blur-sm">
            {error && (
              <div className="mb-2 text-xs text-red-300 bg-red-900/20 border border-red-500/30 rounded p-2">{error}</div>
            )}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => {
                  const val = e.target.value;
                  setInput(val);
                  const lower = val.toLowerCase();
                  const looksGeneral = lower.includes('?') || /\b(what|how|why|explain|tell me|difference|compare|guide|help)\b/.test(lower);
                  const collecting = [Step.GetName, Step.GetContactChoice, Step.GetEmail, Step.GetPhone, Step.GetMessage, Step.Confirm].includes(step);
                  setAiHint(looksGeneral && !collecting);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUserInput();
                  }
                }}
                disabled={submitting}
                placeholder={step === Step.Greet ? 'Hi' : 'Type your message…'}
                className="flex-1 px-3 py-2 rounded-lg bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 disabled:opacity-70"
              />
              <button
                onClick={handleUserInput}
                disabled={submitting || aiLoading}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center gap-2 disabled:opacity-70"
              >
                {(submitting || aiLoading) ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                {submitting ? 'Sending' : aiLoading ? 'Thinking' : 'Send'}
              </button>
            </div>
            {aiHint && !aiLoading && (
              <div className="mt-2 text-[10px] text-cyan-300">
                Tip: Ask AI — I can answer general questions.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingBot;
