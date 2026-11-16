// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

interface ContactFormData {
  name: string
  email: string
  message: string
  phone?: string
}

// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

console.log("Contact form Edge Function loaded!")

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    )
  }

  try {
    // Parse request body
    const contactData: ContactFormData = await req.json()

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message' }),
        {
          status: 400,
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          }
        }
      )
    }

    // Initialize Supabase client with service role key for database operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert contact submission into database
    const { error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          phone: contactData.phone || null
        }
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to save contact submission' }),
        {
          status: 500,
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          }
        }
      )
    }

    // Send email via Resend API
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY')
      const trelloEmail = Deno.env.get('TRELLO_EMAIL')
      const fromEmail = Deno.env.get('FROM_EMAIL')

      if (!resendApiKey || !trelloEmail || !fromEmail) {
        console.error('Missing Resend environment variables')
        // Don't fail the request if email fails, just log it
      } else {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [trelloEmail],
            subject: `New Contact Form Submission from ${contactData.name}`,
            html: `
              <div>
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
                <hr>
                <p><strong>Message:</strong></p>
                <p>${contactData.message.replace(/\n/g, '<br>')}</p>
              </div>
            `
          })
        })

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text()
          console.error('Resend API error:', errorText)
          // Don't fail the request if email fails
        } else {
          console.log('Email sent successfully to Trello')
        }
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    // Return success response
    return new Response(
      JSON.stringify({ success: 'Message sent and saved successfully!' }),
      {
        status: 200,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        }
      }
    )
  }
})