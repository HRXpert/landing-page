"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { getUserAccess } from "../../api/billing/billing";

const MAX_ATTEMPTS = 12;
const POLL_INTERVAL_MS = 5000;

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFree = searchParams.get("free") === "true";

  const [status, setStatus] = useState<"polling" | "success" | "timeout">(
    isFree ? "success" : "polling"
  );
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isFree || status === "success") return;

    /**
     * Poll the payment history endpoint to get userId, then check access.
     * We do NOT trust Safepay's redirect params — backend is the source of truth.
     */
    const pollAccess = async () => {
      try {
        const { getPaymentHistory } = await import(
          "../../api/billing/billing"
        );
        const histResult = await getPaymentHistory();

        if (
          histResult.success &&
          histResult.data &&
          histResult.data.length > 0
        ) {
          const userId = histResult.data[0].userId;
          const accessResult = await getUserAccess(userId);

          if (
            accessResult.success &&
            accessResult.data?.status === "active"
          ) {
            setStatus("success");
            return;
          }
        }
      } catch {
        // continue polling silently
      }

      setAttempts((prev) => {
        const next = prev + 1;
        if (next >= MAX_ATTEMPTS) setStatus("timeout");
        return next;
      });
    };

    const interval = setInterval(pollAccess, POLL_INTERVAL_MS);
    pollAccess();
    return () => clearInterval(interval);
  }, [isFree, status]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 text-center backdrop-blur-sm">
        {status === "polling" && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-indigo-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Processing Payment...
            </h1>
            <p className="text-gray-400">
              Confirming your payment with Safepay. This may take a few moments.
            </p>
            <p className="text-gray-500 text-sm mt-4">Do not close this page.</p>
            <p className="text-gray-600 text-xs mt-2">
              Attempt {attempts + 1} of {MAX_ATTEMPTS}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-400 mb-6">
              Your plan has been activated. You now have full access to all
              features.
            </p>
            <button
              onClick={() => router.push("/admin-recruiter")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === "timeout" && (
          <>
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              Still Processing...
            </h1>
            <p className="text-gray-400 mb-2">
              Your payment is being processed. It may take a few more minutes
              to reflect.
            </p>
            <p className="text-gray-400 mb-6">
              If you were charged, your plan will activate shortly. Please
              check your billing page.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/admin-recruiter/billing")}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-xl transition-colors font-medium"
              >
                Check Billing
              </button>
              <button
                onClick={() => router.push("/admin-recruiter")}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors font-medium"
              >
                Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
