"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SignUpPage() {
  const [isSSO, setIsSSO] = useState(false)
  const [signUpError, setSignUpError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement sign-up logic
    console.log(values)
    // Simulating an error for demonstration
    setSignUpError("An account with this email already exists.")
  }

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]+/)) strength += 25
    if (password.match(/[A-Z]+/)) strength += 25
    if (password.match(/[0-9]+/)) strength += 25
    return strength
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
              Create your Sweepo.ai account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Join us for smarter, cleaner data management.
            </p>
          </div>

          <SocialLoginButtons />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with email
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <Progress value={passwordStrength(field.value)} className="h-1 mt-2" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <Button variant="link" className="p-0">
                          terms and conditions
                        </Button>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>

          {signUpError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {signUpError}
              </AlertDescription>
            </Alert>
          )}

          <EnterpriseLoginButton onClick={() => setIsSSO(true)} />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0">Log in here</Button>
          </p>
        </div>
      </div>

      <SSOLoginModal isOpen={isSSO} onClose={() => setIsSSO(false)} />
    </div>
  )
}

