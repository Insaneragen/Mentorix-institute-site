import React, { useState, useEffect } from 'react';
import { CreditCard, Download, CheckCircle, Info, Landmark, FileText } from 'lucide-react';
import { getCurrentFinancials } from '../lib/database';

const Financials = () => {
  const [financials, setFinancials] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFinancials = async () => {
      const data = await getCurrentFinancials();
      setFinancials(data);
      setLoading(false);
    };
    loadFinancials();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Loading Financials...</div>;
  }

  if (!financials) {
    return <div className="p-8 text-center text-slate-500">Unable to load financial data.</div>;
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Financial Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
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
              {financials.totalFee.toLocaleString()} {financials.currency}
            </h3>
            <p className="text-[10px] text-brand-gray mt-1">
              Reflects approved tuition pricing.
            </p>
          </div>
        </div>

        {/* Fee Statement Uploaded by Admin */}
        <div className="bg-white p-6 rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-white to-brand-blue-light/20 shadow-soft flex flex-col justify-between min-h-[120px] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Official Fee Statement</span>
            <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
              <FileText size={16} />
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-brand-navy">
                {financials.fee_statement_url ? 'Statement Available' : 'No Statement Uploaded'}
              </p>
              <p className="text-[10px] text-brand-gray mt-1">
                Your monthly payment details and receipts.
              </p>
            </div>
            
            {/* Dynamic Download Receipt Button Widget */}
            {financials.fee_statement_url ? (
              <a
                href={financials.fee_statement_url}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 shrink-0 hover:-translate-y-0.5"
              >
                <Download size={13} />
                <span>View / Download Statement</span>
              </a>
            ) : (
              <span className="text-[10px] font-bold text-brand-gray bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                Pending Admin Upload
              </span>
            )}
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

    </div>
  );
};

export default Financials;
