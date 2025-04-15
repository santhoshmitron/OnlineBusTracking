"use client";

import Image from "next/image";

interface PaymentQRProps {
  amount: number;
  upiId: string;
  payeeName?: string;
}

export function PaymentQR({
  amount,
  upiId,
  payeeName = "Vehicle Service",
}: PaymentQRProps) {
  // Create UPI payment URL
  // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=TRANSACTION_NOTE
  const upiPaymentUrl = `upi://pay?pa=${encodeURIComponent(
    upiId
  )}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(
    2
  )}&cu=INR&tn=${encodeURIComponent("Vehicle Ticket Payment")}`;

  // We'll use a simpler approach with SVG QR code
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Scan to Pay</h3>
      <p className="text-sm text-gray-500 mb-4">Amount: ₹{amount.toFixed(2)}</p>

      {/* SVG QR Code */}
      <div className="w-[200px] h-[200px] bg-white flex items-center justify-center">
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            upiPaymentUrl
          )}`}
          alt="Payment QR Code"
          width={200}
          height={200}
          className="border border-gray-100"
          unoptimized // Since this is an external image from a QR service
        />
      </div>

      <p className="text-xs text-gray-500 mt-4">UPI ID: {upiId}</p>
      <p className="text-xs text-gray-400 mt-1">
        Scan with any UPI app (PhonePe, Google Pay, etc.)
      </p>
    </div>
  );
}
