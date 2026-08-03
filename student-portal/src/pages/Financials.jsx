import React from 'react';
import { CreditCard, Download, CheckCircle, Info, Landmark, Receipt } from 'lucide-react';
import { mockFinancials } from '../lib/mockData';

const Financials = () => {
  const handleDownloadReceipt = (receiptId) => {
    alert(`Downloading receipt file "${receiptId}.pdf" to your system...`);
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Financial Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Billable Fee */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Total Programme Fee</span>
            <div className="p-2 rounded-lg bg-blue-50 text-brand-blue">
              <Landmark size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-extrabold text-brand-slate">
              {mockFinancials.totalFee.toLocaleString()} {mockFinancials.currency}
            </h3>
            <p className="text-[10px] text-brand-gray mt-1">
              Reflects approved KHDA activity pricing.
            </p>
          </div>
        </div>

        {/* Paid Amount */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Total Paid (To Date)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-extrabold text-brand-slate">
              {mockFinancials.paidAmount.toLocaleString()} {mockFinancials.currency}
            </h3>
            <p className="text-[10px] text-emerald-600 font-semibold mt-1">
              75% of total tuition settled.
            </p>
          </div>
        </div>

        {/* Balance Outstanding */}
        <div className="bg-white p-6 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-white to-brand-blue-light/20 shadow-soft flex flex-col justify-between min-h-[120px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Fee Balance Outstanding</span>
            <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-extrabold text-brand-navy">
              {mockFinancials.balanceAmount.toLocaleString()} {mockFinancials.currency}
            </h3>
            <p className="text-[10px] text-brand-gray mt-1">
              Settlements processed via invoice milestones.
            </p>
          </div>
        </div>

      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-brand-gray">
        <Info size={16} className="text-brand-blue shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Need an official corporate invoice or tax statement? Please reach out to the accounts department at **finance@mentorixacademy.com** quoting your Student ID. Indicative fees exclude any optional international certificate attestation fees.
        </p>
      </div>

      {/* Transaction Log Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-extrabold text-brand-navy text-base">
            Payment Transaction History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-light border-b border-gray-200 text-xs font-bold text-brand-slate uppercase tracking-wider">
                <th className="py-4 px-6">Receipt ID</th>
                <th className="py-4 px-6">Payment Date</th>
                <th className="py-4 px-6 hidden sm:table-cell">Method</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-brand-slate">
              {mockFinancials.payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-brand-light/30 transition-colors">
                  <td className="py-4.5 px-6 font-bold text-brand-blue flex items-center gap-2">
                    <Receipt size={14} className="text-brand-gray shrink-0" />
                    <span className="font-mono">{payment.id}</span>
                  </td>
                  <td className="py-4.5 px-6 font-semibold text-brand-gray">
                    {payment.date}
                  </td>
                  <td className="py-4.5 px-6 text-brand-gray font-semibold hidden sm:table-cell">
                    {payment.method}
                  </td>
                  <td className="py-4.5 px-6 font-extrabold">
                    {payment.amount.toLocaleString()} {mockFinancials.currency}
                  </td>
                  <td className="py-4.5 px-6">
                    <button
                      onClick={() => handleDownloadReceipt(payment.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-brand-slate hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm"
                    >
                      <Download size={12} />
                      <span className="hidden md:inline">PDF Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;
