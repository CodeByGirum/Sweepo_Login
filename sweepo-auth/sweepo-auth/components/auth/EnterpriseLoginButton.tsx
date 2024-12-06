import { Button } from "@/components/ui/button"
import { Building2 } from 'lucide-react'

interface EnterpriseLoginButtonProps {
  onClick: () => void
}

export function EnterpriseLoginButton({ onClick }: EnterpriseLoginButtonProps) {
  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      <Building2 className="mr-2 h-4 w-4" />
      Log in with SSO
    </Button>
  )
}

