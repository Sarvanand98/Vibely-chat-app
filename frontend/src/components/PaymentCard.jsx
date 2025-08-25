import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import QRCode from 'react-qr-code'; // Correct import

const PaymentCard = ({ payment }) => {
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(payment.details);
    toast.success('Copied to clipboard!');
  };
  const upiId = payment.details;
  const upiUri = `upi://pay?pa=${upiId}`;


  const typeIcon = {
    upi: '💳',
    card: '💳',
    bank: '🏦',
    wallet: '👛',
    phonepe: '📱',
    paytm: '📱',
    crypto: '🪙'
  };

  return (
    <div className="relative group bg-gradient-to-br from-base-100 via-base-200 to-base-300 border border-base-300 rounded-2xl shadow-lg p-5 transition-all hover:shadow-xl hover:border-primary">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{typeIcon[payment.type] || '💰'}</span>
        <span className="font-bold text-xl capitalize text-primary">{payment.type}</span>
      </div>
      <div className="font-semibold text-lg mb-1 text-base-content flex justify-between items-center">
        <span className='py-2 pl-2'>{payment.label}</span>
        {(payment.type === "upi" || payment.type === "phonepe" || payment.type === "gpay" || payment.type === "Crypto") && (
          <button className='btn btn-primary' onClick={() => setShowQR(!showQR)}>
            {showQR ? 'Hide QR' : 'QRCode'}
          </button>
        )}
      </div>

      {showQR && (
    payment.type === "Crypto"  ? (
    <div className="flex flex-col items-center py-2">
      <QRCode value={upiId} size={128} />
      <span className="mt-2 text-xs text-base-content break-all">{payment.details}</span>
    </div>
  ) : (
    <div className="flex flex-col items-center py-2">
      <QRCode value={upiUri} size={128} />
      <span className="mt-2 text-xs text-base-content break-all">{payment.details}</span>
    </div>
  )
)}
      <div className="flex items-center gap-2 bg-base-200 rounded-lg px-3 py-2 mb-2">
        {payment.type === "card" ? (
          <div className="flex flex-col gap-1 w-full">
            <span className="font-mono text-base-content">Card No: {payment.details.number}</span>
            <span className="text-xs text-base-content">Expiry: {payment.details.expiry}</span>
            <span className="text-xs text-base-content">Name: {payment.details.name}</span>
          </div>
        ) : (
          <>
            <span className="text-sm break-all text-base-content">{payment.details}</span>
            <button
              className="ml-auto btn btn-sm btn-circle btn-primary opacity-80 group-hover:opacity-100 transition"
              onClick={handleCopy}
              title="Copy details"
            >
              <Copy className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      <span className="absolute top-3 right-5 text-xs text-base-700 bg-base-100 px-2 py-1 rounded-full shadow-sm">
        {payment.label ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
};

export default PaymentCard;