import { useFormState } from "react-dom";
import SubmitButton from "./submitButton";
import { createUser } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
};

export default function SignUpComponent() {
  const router = useRouter();
  const [error, action] = useFormState(createUser, initialState);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">新規登録</h1>
      <form action={action} className="w-full max-w-xs space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            minLength={6}
            className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <SubmitButton title="新規登録" />
          <p className="text-red-500">{error?.message}</p>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={() => router.push("/login")}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          既に登録済みの方はこちら
        </button>
      </div>
    </main>
  );
}