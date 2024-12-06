import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from 'lucide-react'

export function LogoutPage() {
  const handleLogoutAllDevices = () => {
    // TODO: Implement logout from all devices logic
    console.log("Logging out from all devices")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Successfully Logged Out</CardTitle>
          <CardDescription>Thank you for using Sweepo.ai</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            You've been securely logged out of your account. We hope to see you again soon!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={() => console.log("Redirecting to login")}>
            Log back in
          </Button>
          <Button variant="outline" className="w-full" onClick={handleLogoutAllDevices}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out from all devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

