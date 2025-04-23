"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { ethers } from "ethers";
import type { ProviderRpcError } from "@/types/ethereum";

export default function MetaMaskLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      setIsMetaMaskInstalled(!!window.ethereum && !!window.ethereum.isMetaMask);
    }
  }, []);

  useEffect(() => {
    // Redirect to /send after successful connection and brief display of address
    if (account && isSuccess) {
      const timer = setTimeout(() => {
        router.push("/send");
      }, 2000); // Wait 2 seconds before redirecting
      return () => clearTimeout(timer);
    }
  }, [account, isSuccess, router]);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    setIsConnecting(true);

    try {
      if (typeof window !== "undefined" && window.ethereum) {
        // Use ethers.js to connect to MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Request account access
        const accounts = await provider.send("eth_requestAccounts", []);

        // Get the first account
        const account = accounts[0];
        setAccount(account);
        setIsSuccess(true);
        setIsLoading(false);
        setIsConnecting(false);
      } else {
        setError(
          "MetaMask is not installed. Please install MetaMask to continue."
        );
        setIsMetaMaskInstalled(false);
        setIsLoading(false);
        setIsConnecting(false);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);

      // Type guard to check if error is a ProviderRpcError
      const providerError = error as ProviderRpcError;
      if (providerError.code === 4001) {
        // User rejected the request
        setError(
          "You rejected the connection request. Please approve the connection to continue."
        );
      } else {
        setError("Failed to connect to MetaMask. Please try again.");
      }

      setIsLoading(false);
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden max-w-md w-full">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <Image
              src="/metamask-fox-logo.png"
              alt="MetaMask Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Welcome to Vehicle Data Display
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-center mb-8">
          Connect your MetaMask wallet to access the application
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {account && isSuccess ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-300">
                  Successfully connected!
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-1 break-all">
                  {account}
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-2 flex items-center">
                  Redirecting to application
                  <ArrowRight className="h-3 w-3 ml-1" />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isLoading || !isMetaMaskInstalled}
            className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-all ${
              isLoading || !isMetaMaskInstalled
                ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Connecting...
              </>
            ) : !isMetaMaskInstalled ? (
              "MetaMask Not Installed"
            ) : (
              "Connect Wallet"
            )}
          </button>
        )}

        {!isMetaMaskInstalled && !isConnecting && (
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
            Please install{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              MetaMask
            </a>{" "}
            to continue
          </p>
        )}
      </div>

      <div className="px-8 py-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          By connecting, you agree to the terms and conditions of this
          application
        </p>
      </div>
    </div>
  );
}
