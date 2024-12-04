import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { googleAuthAPI, googleAuthSuccessAPI, signupAPI } from "@/store/services/userAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resetUserState } from "@/store/features/userSlice";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be of 3 length." }).max(50),
  email: z
    .string()
    .min(1, { message: "Field is required" })
    .email("Enter a valid mail"),
  password: z
    .string()
    .min(6, { message: "Password must be of atleast 6 characters." }),
});

function Signup() {
  const dispatch = useDispatch();
  const { status, message, loading } = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function signup(values) {
    dispatch(signupAPI(values));
  }
  const googleAuth =() => {
    dispatch(googleAuthAPI())
    googleAuthSuccessAPI()
  }
  useEffect(() => {
      if (status && message) {
        toast.success(message);
      } else if (!status && message) {
        toast.error(message);
      }
      return () => dispatch(resetUserState())
  }, [loading]);

  return (
    <div className="flex justify-center items-center my-3">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(signup)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Robinson" {...field} />
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
                        <Input placeholder="m@example.com" {...field} />
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
                        <Input {...field} type="password"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </form>
            </Form>
            <Button variant="outline" className="w-full" onClick={googleAuth}>
              Continue with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/login"} className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
