import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { images } from "../data";
import { useShop } from "../store";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const signUpSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
    password: z.string().min(4),
    confirm: z.string().min(4),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords must match" });

function AuthShell({ img, children }: { img: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <img src={img} alt="" className="hidden h-screen w-full object-cover md:block" />
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export function SignIn() {
  const nav = useNavigate();
  const setUser = useShop((s) => s.setUser);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  return (
    <AuthShell img={images.signin}>
      <Link to="/" className="font-serif text-3xl">FASCO</Link>
      <h1 className="mt-6 font-serif text-3xl">Sign In To FASCO</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="h-11 border border-line text-sm">Sign up with Google</button>
        <button className="h-11 border border-line text-sm">Sign up with Email</button>
      </div>
      <div className="my-6 text-center text-sm text-mute">OR</div>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((d) => {
          setUser({ firstName: "Guest", lastName: "", email: d.email });
          nav("/");
        })}
      >
        <input className="h-12 w-full border-b border-line outline-none" placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-xs text-sale">{errors.email.message}</p>}
        <input type="password" className="h-12 w-full border-b border-line outline-none" placeholder="Password" {...register("password")} />
        <button className="mt-4 h-12 w-full bg-black text-white">Sign In</button>
        <Link to="/signup" className="flex h-12 w-full items-center justify-center border border-black">
          Register Now
        </Link>
        <Link to="/signup" className="block text-right text-sm">Forgot Password?</Link>
      </form>
      <p className="mt-10 text-xs text-mute">FASCO Terms & Conditions</p>
    </AuthShell>
  );
}

export function SignUp() {
  const nav = useNavigate();
  const setUser = useShop((s) => s.setUser);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });
  return (
    <AuthShell img={images.signup}>
      <Link to="/" className="font-serif text-3xl">FASCO</Link>
      <h1 className="mt-6 font-serif text-3xl">Create Account</h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="h-11 border border-line text-sm">Sign up with Google</button>
        <button className="h-11 border border-line text-sm">Sign up with Email</button>
      </div>
      <div className="my-6 text-center text-sm text-mute">OR</div>
      <form
        className="grid grid-cols-2 gap-3"
        onSubmit={handleSubmit((d) => {
          setUser({ firstName: d.firstName, lastName: d.lastName, email: d.email });
          nav("/");
        })}
      >
        <input className="h-12 border-b border-line outline-none" placeholder="First Name" {...register("firstName")} />
        <input className="h-12 border-b border-line outline-none" placeholder="Last Name" {...register("lastName")} />
        <input className="h-12 border-b border-line outline-none" placeholder="Email Address" {...register("email")} />
        <input className="h-12 border-b border-line outline-none" placeholder="Phone Number" {...register("phone")} />
        <input type="password" className="h-12 border-b border-line outline-none" placeholder="Password" {...register("password")} />
        <input type="password" className="h-12 border-b border-line outline-none" placeholder="Confirm Password" {...register("confirm")} />
        {errors.confirm && <p className="col-span-2 text-xs text-sale">{errors.confirm.message}</p>}
        <button className="col-span-2 mt-2 h-12 bg-black text-white">Create Account</button>
      </form>
      <p className="mt-6 text-sm">
        Already have an account? <Link to="/signin" className="underline">Login</Link>
      </p>
    </AuthShell>
  );
}
