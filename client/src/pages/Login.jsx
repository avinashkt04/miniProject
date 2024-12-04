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
import { currentUserAPI, googleAuthAPI, googleAuthSuccessAPI, loginAPI } from "@/store/services/userAction";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { resetUserState } from "@/store/features/userSlice";

const formSchema = z.object({
  email: z.string().min(1, {message: 'Field is required'}).email("Enter a valid mail"),
  password: z.string().min(1, {message: 'Field is required'}),
});

function Login() {
  const dispatch = useDispatch()
  const { status, message, loading } = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  function login(values) {
    dispatch(loginAPI(values))
  }

  const googleAuth = () => {
    dispatch(googleAuthAPI())
  }
  
  useEffect(() => {
    dispatch(googleAuthSuccessAPI())
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(login)}
                className="space-y-4"
              >
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
                  Login
                </Button>
              </form>
            </Form>
            <Button variant="outline" className="w-full" onClick={googleAuth}>
              Continue with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
