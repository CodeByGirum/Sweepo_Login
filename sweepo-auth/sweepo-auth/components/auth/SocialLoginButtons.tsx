import { Button } from "@/components/ui/button"
import { ChromeIcon as Google, Github, Linkedin } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full">
              <Google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Securely log in with your Google account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Log in using your GitHub account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in with your LinkedIn profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

