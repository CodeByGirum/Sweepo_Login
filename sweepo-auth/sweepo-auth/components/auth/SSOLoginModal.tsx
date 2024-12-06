import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SSOLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SSOLoginModal({ isOpen, onClose }: SSOLoginModalProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement SSO login logic
    console.log("SSO login with:", email)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enterprise SSO Login</DialogTitle>
          <DialogDescription>
            Enter your company email to log in with Single Sign-On.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Continue with SSO</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

