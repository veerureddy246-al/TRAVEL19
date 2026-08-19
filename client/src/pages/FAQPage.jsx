import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import FoldText from './FoldText';


const defaultFaqsList = [
  {
    question: 'How do I modify or cancel my flight or holiday booking?',
    answer: 'You can easily modify or cancel your booking through your Ventoura account dashboard or by calling our 24x7 Customer Support at 1800-VENTOURA. Cancellation refunds are processed instantly back to your original payment method.'
  },
  {
    question: 'What is Ventoura\'s Zero Cancellation Fee guarantee?',
    answer: 'Selected flight routes and holiday packages tagged with "Zero Cancellation Fee" allow full refund cancellations up to 24 hours prior to travel date without any penalty charges.'
  },
  {
    question: 'Are hotel stays 100% verified and inclusive of taxes?',
    answer: 'Yes! Every hotel listed on Ventoura undergoes strict hygiene and service verification. All prices displayed include base fare, GST, and property fees so there are no hidden surprises at check-in.'
  },
  {
    question: 'What payment options are accepted on Ventoura?',
    answer: 'We support all major payment options in India: UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay, Amex), Net Banking across 50+ banks, and flexible No-Cost EMI options.'
  },
  {
    question: 'How do I receive my booking voucher and flight e-tickets?',
    answer: 'Instant booking confirmation vouchers and flight e-tickets with QR codes are sent immediately to your registered email address and mobile number via SMS & WhatsApp after successful payment.'
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="pt-8 pb-16 bg-light-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Title */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-center">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest border border-primary/30 inline-flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </span>
            <FoldText as="h1" className="text-3xl sm:text-5xl font-black text-white">
              Frequently Asked <span className="text-primary">Questions</span>
            </FoldText>
            <p className="text-sm text-slate-300">
              Find answers regarding flight bookings, hotel vouchers, cancellations, refund timelines, and promo codes.
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {defaultFaqsList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-border-color shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-base text-charcoal hover:text-primary transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default FAQPage;

