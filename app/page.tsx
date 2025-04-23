import MetaMaskLogin from "@/components/metamask-login";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <MetaMaskLogin />
    </div>
  );
}
