import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from 'lucide-react'
import { Label } from "@/components/ui/label"

export function MagicLinkLogin() {
  const [email, setEmail] = useState("")
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement magic link login logic
    console.log("Magic link sent to:", email)
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          A secure login link has been sent to your email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="magic-link-email">Email</Label>
        <Input
          id="magic-link-email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Send Magic Link
      </Button>
    </form>
  )
}

