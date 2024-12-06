"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SocialLoginButtons } from "./SocialLoginButtons"
import { EnterpriseLoginButton } from "./EnterpriseLoginButton"
import { SSOLoginModal } from "./SSOLoginModal"
import { MagicLinkLogin } from "./MagicLinkLogin"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().default(false),
})

export function LoginPage() {
  const [isSSO, setIsSSO] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement login logic
    console.log(values)
    // Simulating an error for demonstration
    setLoginError("Invalid email or password. Please try again.")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center">
        {/* Add a welcome graphic or animation here */}
        <div className="text-4xl font-bold text-primary-foreground">Welcome to Sweepo.ai</div>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Welcome to Sweepo.ai
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Smarter, Cleaner Data – Log in securely to your account.
            </p>
          </div>

          <SocialLoginButtons />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Keep me signed in
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant="link" className="px-0">Forgot password?</Button>
              </div>
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </Form>

          {loginError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {loginError}
              </AlertDescription>
            </Alert>
          )}

          <EnterpriseLoginButton onClick={() => setIsSSO(true)} />
          
          <MagicLinkLogin />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0">Sign up here</Button>
          </p>
        </div>
      </div>

      <SSOLoginModal isOpen={isSSO} onClose={() => setIsSSO(false)} />
    </div>
  )
}

