export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-wetSand flex items-center justify-center px-6">
      <div className="bg-eggshell p-10 rounded-xl shadow-xl max-w-lg text-center">
        <h1 className="text-4xl font-serif mb-6 text-stone">Almost There!</h1>
        <p className="text-lg text-stone mb-4">
          We've sent a confirmation email to your address.
        </p>
        <p className="text-stone mb-8">
          Please check your inbox and click the link to verify your account. If
          you don't see it, check your spam folder.
        </p>
        <button className="bg-wetSand text-eggshell py-3 px-6 rounded-lg text-lg">
          <a href="/login">Back to Login</a>
        </button>
      </div>
    </main>
  );
}
