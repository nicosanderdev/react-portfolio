export type CaseStudyKind = "real" | "illustrative";

export type CaseStudyStepId =
  | "questions"
  | "research"
  | "prototype"
  | "decision"
  | "specification"
  | "tasks"
  | "implementation"
  | "tests"
  | "production";

export type CaseStudyExcerpt = {
  label: string;
  source?: string;
  code: string;
};

export type CaseStudyStep = {
  id: CaseStudyStepId;
  label: string;
  kind: CaseStudyKind;
  summary: string;
  excerpts: CaseStudyExcerpt[];
};

export const CASE_STUDY_STEPS: CaseStudyStep[] = [
  {
    id: "questions",
    label: "Questions",
    kind: "illustrative",
    summary:
      "Frame the problem before touching infrastructure: what must the contact path guarantee, and what can it drop?",
    excerpts: [
      {
        label: "Illustrative framing notes",
        code: `Q: Who owns delivery failure — the UI, the API, or email?
Q: Do we need durable submissions, or only outbound mail?
Q: What breaks if the Express box goes down on a weekend?
Q: Is Gmail OAuth a product dependency we want to keep?`,
      },
    ],
  },
  {
    id: "research",
    label: "Research",
    kind: "illustrative",
    summary:
      "Short compare of hosting the contact path on a long-lived Node server vs a Supabase Edge Function + table + email provider.",
    excerpts: [
      {
        label: "Illustrative research scratch",
        code: `Express + Gmail API
  + familiar Node stack
  - OAuth refresh tokens, Docker host, CORS config on a box

Supabase Edge Function + DB + Resend
  + managed runtime, SQL history, one invoke from the client
  - Deno deploy surface, secrets in the project, CORS on every response`,
      },
    ],
  },
  {
    id: "prototype",
    label: "Prototype",
    kind: "illustrative",
    summary:
      "Spike the invoke shape before deleting the Express route — prove the browser can call an edge function with the same payload.",
    excerpts: [
      {
        label: "Illustrative spike",
        code: `// throwaway: can the client reach contact-form?
const { data, error } = await supabase.functions.invoke('contact-form', {
  body: { name: 'spike', email: 'a@b.c', message: 'ping' }
})
// next: insert row, then wire Resend — only if invoke is green`,
      },
    ],
  },
  {
    id: "decision",
    label: "Decision",
    kind: "real",
    summary:
      "Leave Express + Gmail behind. Contact submissions go through a Supabase Edge Function that writes Postgres and sends mail via Resend. Commit: migration to supabase (7b87ed4).",
    excerpts: [
      {
        label: "Before — Express client call",
        source: "client/src/services/ContactService.tsx (pre-migration)",
        code: `import apiClient from './AxiosClient';

const ENDPOINTS = {
  CONTACT: '/contact',
};

const sendContactForm = async (params: ContactForm): Promise<void> => {
  await apiClient.post<ContactForm>(ENDPOINTS.CONTACT, params);
};`,
      },
      {
        label: "Before — Express + Gmail API server",
        source: "server/index.js (removed in migration)",
        code: `const { google } = require('googleapis');
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
// gmail.users.messages.send({ userId: 'me', requestBody: { raw } })`,
      },
      {
        label: "After — Supabase invoke",
        source: "client/src/services/ContactService.tsx",
        code: `// Call Supabase Edge Function instead of Express API
const { data, error } = await supabase.functions.invoke('contact-form', {
  body: params
});`,
      },
    ],
  },
  {
    id: "specification",
    label: "Specification",
    kind: "real",
    summary:
      "Contract for the path: required fields, persisted row shape, and edge-function payload. Drawn from the migration and the function’s types.",
    excerpts: [
      {
        label: "Payload contract",
        source: "supabase/functions/contact-form/index.ts",
        code: `interface ContactFormData {
  name: string
  email: string
  message: string
  phone?: string
}`,
      },
      {
        label: "Persistence contract",
        source: "supabase/migrations/20260112183626_create_contact_submissions_table.sql",
        code: `CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`,
      },
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    kind: "illustrative",
    summary:
      "Breakdown used to sequence the cutover — illustrative ticket list, not a preserved project board export.",
    excerpts: [
      {
        label: "Illustrative task list",
        code: `[ ] Add contact_submissions migration + RLS for service role
[ ] Port /contact handler to Deno Edge Function
[ ] Swap ContactService from Axios → supabase.functions.invoke
[ ] Wire Resend + env secrets; keep UI success if mail soft-fails
[ ] Remove Express server + Gmail OAuth secrets
[ ] Verify CORS preflight from the Vite origin`,
      },
    ],
  },
  {
    id: "implementation",
    label: "Implementation",
    kind: "real",
    summary:
      "Client invokes the edge function; the function validates, inserts, and emails. Short excerpts from the shipped files.",
    excerpts: [
      {
        label: "Client service",
        source: "client/src/services/ContactService.tsx",
        code: `const sendContactForm = async (params: ContactForm): Promise<void> => {
  const { data, error } = await supabase.functions.invoke('contact-form', {
    body: params
  });
  if (error) throw new Error(error.message || 'Failed to send contact form');
  if (data?.error) throw new Error(data.error);
};`,
      },
      {
        label: "Edge function — validate + insert",
        source: "supabase/functions/contact-form/index.ts",
        code: `if (!contactData.name || !contactData.email || !contactData.message) {
  return new Response(
    JSON.stringify({ error: 'Missing required fields: name, email, message' }),
    { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  )
}

const { error: dbError } = await supabaseClient
  .from('contact_submissions')
  .insert([{ name, email, message, phone: phone || null }])`,
      },
      {
        label: "Edge function — Resend",
        source: "supabase/functions/contact-form/index.ts",
        code: `const emailResponse = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${resendApiKey}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: fromEmail,
    to: [trelloEmail],
    subject: \`New Contact Form Submission from \${contactData.name}\`,
    html: /* submission summary */
  })
})`,
      },
    ],
  },
  {
    id: "tests",
    label: "Tests",
    kind: "illustrative",
    summary:
      "Thin stage for this case study — no dedicated contact-form test suite in-repo. Illustrative checks that would gate the cutover.",
    excerpts: [
      {
        label: "Illustrative smoke checks",
        code: `POST /functions/v1/contact-form  → 200 + row in contact_submissions
OPTIONS preflight               → 200 + Access-Control-Allow-*
missing name/email/message      → 400
invalid email                   → 400
Resend down                     → still 200 if DB insert succeeded`,
      },
    ],
  },
  {
    id: "production",
    label: "Production",
    kind: "real",
    summary:
      "Shipped UI still posts through ContactService. Production proof includes the CORS hotfix after the first edge deploy (a3dd168 — fix: cors missing on edge function).",
    excerpts: [
      {
        label: "Contact UI submit",
        source: "client/src/pages/ContactPage.tsx",
        code: `const mutation = useMutation<void, Error, ContactForm>({
  mutationFn: async (data: ContactForm): Promise<void> => {
    contactService.sendContactForm(data)
  },
  onSuccess: () => {
    setFormData(initialFormData);
  },
});

const payload = {
  name: formData.nombre,
  email: formData.email,
  message: formattedMessage,
};
mutation.mutate(payload);`,
      },
      {
        label: "Proof — CORS hotfix",
        source: "a3dd168 · supabase/functions/contact-form/index.ts",
        code: `// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  // …every JSON response spreads corsHeaders
})`,
      },
    ],
  },
];

export const DEFAULT_CASE_STUDY_STEP_ID: CaseStudyStepId = "decision";

export function getCaseStudyStep(id: CaseStudyStepId): CaseStudyStep {
  return CASE_STUDY_STEPS.find((step) => step.id === id) ?? CASE_STUDY_STEPS[0];
}
