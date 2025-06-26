'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle } from 'lucide-react'
import { subscribeToNewsletter, trackFormEvent } from '@/lib/form-submissions'

interface NewsletterSignupProps {
  source?: string
  className?: string
}

export function NewsletterSignup({ source = 'footer', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setError('')

    try {
      const result = await subscribeToNewsletter(email, undefined, undefined, source)
      
      if (result.success) {
        setIsSubmitted(true)
        setEmail('')
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Newsletter subscription error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`flex items-center gap-2 text-green-400 ${className}`}>
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Thanks for subscribing!</span>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-4"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Mail className="h-4 w-4" />
          )}
        </Button>
      </form>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  )
} 