"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp, signIn } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type}: {type: FormType}) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, email, password } = values;

      if(type === 'sign-up') {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        })

        // Sign out the user immediately after creating account
        await firebaseSignOut(auth);

        if(!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in')
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        if(!idToken) {
          toast.error('Sign in failed')
          return;
        }

        await signIn({
          email, idToken
        })

        toast.success('Sign in successfully.');
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === "sign-in"
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">IntervAi</h2>
        </div>
        <h3 className="text-center">Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">{isSignIn ? "Submit" : "Create an account"}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link href={isSignIn ? '/sign-up' : '/sign-in'} className="font-bold text-primary-100 ml-1">
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm