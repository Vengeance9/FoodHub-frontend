"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data, isPending } = authClient.useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
      rememberMe: false,
    });

    if (error) {
      switch (error.code) {
        case "INVALID_EMAIL_OR_PASSWORD":
          toast.error("Invalid email or password");
          break;
        case "USER_NOT_FOUND":
          toast.error("No account found with this email");
          break;
        case "ACCOUNT_LOCKED":
          toast.error("Account is locked. Please try again later");
          break;
        case "TOO_MANY_REQUESTS":
          toast.error("Too many attempts. Please try again later");
          break;
        default:
          toast.error(error.message || "Something went wrong");
      }
    } else {
      toast.success("Logged in successfully!");
      router.push("/");
    }

    setIsLoading(false);
  };

  // Don't return early - keep the same structure
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading || isPending}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button" disabled={isPending}>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
