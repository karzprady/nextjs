"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    name : z.string().min(1,{message : "name is required"}),
    email : z.string().email(),
    password : z.string().min(1,{message : 'Password is required'}),
    confirmPassword : z.string().min(1,{message:"password is required"})
}).refine((data)=>data.password === data.confirmPassword,{
    message : "passwords don't match",
    path : ["confirmPassword"]
})
export default function SignOutView (){
    const router = useRouter()
    const [error,setError] = useState<string | null>(null)
    const [pending,setPending] = useState(false)

    const onSubmit = async(data : z.infer<typeof formSchema>) => {
        setError(null)
        setPending(true)

        const {error} = await authClient.signUp.email({
            email : data.email,
            password : data.password,
            name : "",
            callbackURL : "/"
       
        },{
            onSuccess : ()=>{
                setPending(false)
                router.push("/")

            },
            onError: ({error})=>{
                setPending(false)
                setError(error.message)
            }
        })
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            email : "",
            password : "",
            name : "",
            confirmPassword : ""
        }
    })
    return <div className="flex flex-col gap-6">
        <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Hey There!</h1>
                                <p className="text-muted-foreground text-balance">
                                    Create your account

                                </p>
                            </div>
                            <div className="grid gap-3">
                            <FormField control={form.control} name="name" render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl >
                                            <Input  placeholder="type ur name" {...field}/>

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/> 
                                <FormField control={form.control} name="email" render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl >
                                            <Input type="email" placeholder="type email" {...field}/>

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}> 
                                    
                                </FormField>
                                <FormField control={form.control} name="password" render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl >
                                            <Input type="password" placeholder="type password" {...field}/>

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}> 

                                    
                                </FormField>
 <FormField control={form.control} name="confirmPassword" render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl >
                                            <Input type="password" placeholder="re-enter your password" {...field}/>

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/> 
                            </div>
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <Button type="submit" className="w-full" disabled={pending}>
                                Sign Up

                            </Button>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                            <span className="bg-card text-muted-foreground relative z-10 px-2">
                                Or Continue with

                            </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant={"outline"} type="button" className="w-full">Google</Button>
                                <Button variant={"outline"} type="button" className="w-full" onClick={async()=>{
                                   setPending(true)
                                   await authClient.signIn.social({
                                        provider : 'github',
                                        callbackURL : "/"
                                    },{
                                        onSuccess : ()=> {
                                            setPending(false)
                                        },
                                        onError:({error})=>{
                                            setPending(false)
                                            setError(error.message)
                                        }
                                    })
                                }}>GitHub</Button>

                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account? <Link className="underline underline-offset-4" href={"/sign-in"}>SignIn</Link>
                                </div>

                        </div>
                    </form>
                </Form>
                
                <div className="bg-radial from-sidebar-accent to-sidebar relative hiddem md:flex flex-col gap-y-4 items-center justify-center">
                <img src="/logo.png" className="h-20 w-20"/>
                <p className="text-2xl font-semibold text-white">
                 MeetAi
                </p>
                </div>

            </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By Clicking continue, you agree to our <a href="#">Terms of service</a> and <a href="#">Privacy policy</a> 

        </div>
    </div>
} 