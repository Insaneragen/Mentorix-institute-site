import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  User, 
  Calendar, 
  CreditCard, 
  PlusCircle, 
  Check, 
  AlertCircle,
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { 
  getStudents, 
  getAttendance, 
  getFinancials, 
  addStudentAttendanceRecord, 
  addFinancialPayment 
} from '../../lib/mockData';

const StudentDirectory = () => {
  const [students, setStudents] = useState(getStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || null);

  // Attendance Form States
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [attCourse, setAttCourse] = useState('Logistics & Supply Chain Management');
  const [attTopic, setAttTopic] = useState('');
  const [attStatus, setAttStatus] = useState('Present');
  const [attNote, setAttNote] = useState('');
  const [attSuccess, setAttSuccess] = useState('');

  // Billing Form States
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('Bank Transfer');
  const [paySuccess, setPaySuccess] = useState('');

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentAttendance = selectedStudent ? getAttendance(selectedStudent.id) : null;
  const studentFinancials = selectedStudent ? getFinancials(selectedStudent.id) : null;

  const handleAddAttendance = (e) => {
    e.preventDefault();
    if (!attTopic) {
      alert("Please specify the class lesson topic.");
      return;
    }
    
    addStudentAttendanceRecord(
      selectedStudent.id,
      attDate,
      attCourse,
      attTopic,
      attStatus,
      attNote
    );

    // Refresh state
    setStudents(getStudents());
    setAttTopic('');
    setAttNote('');
    setAttSuccess('Attendance record added successfully!');
    setTimeout(() => setAttSuccess(''), 3000);
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!payAmount || isNaN(payAmount) || Number(payAmount) <= 0) {
      alert("Please enter a valid numeric payment amount.");
      return;
    }

    if (Number(payAmount) > studentFinancials.balanceAmount) {
      alert("Payment amount exceeds outstanding fee balance.");
      return;
    }

    addFinancialPayment(selectedStudent.id, payAmount, payMethod);

    // Refresh state
    setStudents(getStudents());
    setPayAmount('');
    setPaySuccess('Tuition payment logged successfully!');
    setTimeout(() => setPaySuccess(''), 3000);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Late': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Absent': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-start">
      
      {/* LEFT COLUMN: Student search and list roster (1 Column) */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
        {/* Header search panel */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
          <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
            <Users size={16} className="text-emerald-600" />
            <span>Class Registry List</span>
          </h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* List items scrollable container */}
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No students match criteria.
            </div>
          ) : (
            filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => {
                  setSelectedStudentId(student.id);
                  setAttSuccess('');
                  setPaySuccess('');
                }}
                className={`w-full p-4 text-left transition-colors flex items-center justify-between gap-3 ${
                  selectedStudentId === student.id
                    ? 'bg-slate-100 border-l-4 border-l-emerald-600 font-bold'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{student.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{student.studentId}</p>
                </div>
                <ChevronRight size={14} className="text-slate-400 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Student profile overview and record inputs (2 Columns) */}
      <div className="lg:col-span-2 space-y-6">
        {selectedStudent ? (
          <>
            {/* Student Admin Card Summary Header */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 flex flex-col sm:flex-row items-center gap-4 relative">
              <div className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center text-lg font-black shadow border-2 border-emerald-500/20">
                {selectedStudent.name.split(' ').map(p => p[0]).join('').toUpperCase()}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedStudent.program}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID Code: {selectedStudent.studentId} &middot; Contact: {selectedStudent.phone}</p>
              </div>
            </div>

            {/* Grid for editors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Record Attendance Status */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <Calendar size={15} className="text-emerald-600" />
                  <span>Log Attendance Record</span>
                </h4>

                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border text-slate-500 flex justify-between items-center font-bold">
                  <span>Current Attendance Rate:</span>
                  <span className="text-emerald-600 text-sm font-black">{studentAttendance?.overallPercentage}%</span>
                </div>

                {attSuccess && (
                  <div className="p-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
                    {attSuccess}
                  </div>
                )}

                <form onSubmit={handleAddAttendance} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lecture Course</label>
                    <select
                      value={attCourse}
                      onChange={(e) => setAttCourse(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option>Logistics & Supply Chain Management</option>
                      <option>AI & Automation in Logistics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Class Date</label>
                    <input
                      type="date"
                      value={attDate}
                      onChange={(e) => setAttDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lecture Lesson Topic</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Route Algorithms"
                      value={attTopic}
                      onChange={(e) => setAttTopic(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {['Present', 'Late', 'Absent'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAttStatus(st)}
                        className={`py-2 border rounded-lg font-bold text-[10px] transition-all ${
                          attStatus === st
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Optional Note (Medical, etc.)</label>
                    <input
                      type="text"
                      placeholder="Reason for absence/delay"
                      value={attNote}
                      onChange={(e) => setAttNote(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <PlusCircle size={14} />
                    <span>Log Attendance Entry</span>
                  </button>
                </form>
              </div>

              {/* Box 2: Record Tuition Fees */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5 flex items-center gap-2">
                  <CreditCard size={15} className="text-emerald-600" />
                  <span>Tuition Invoice Ledger</span>
                </h4>

                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border text-slate-500 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Outstanding Balance:</span>
                    <span className="text-red-500">{studentFinancials?.balanceAmount.toLocaleString()} AED</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span>Amount Settled:</span>
                    <span>{studentFinancials?.paidAmount.toLocaleString()} / {studentFinancials?.totalFee.toLocaleString()} AED</span>
                  </div>
                </div>

                {paySuccess && (
                  <div className="p-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
                    {paySuccess}
                  </div>
                )}

                {studentFinancials?.balanceAmount > 0 ? (
                  <form onSubmit={handleAddPayment} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Receipt Collected Amount (AED)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 2500"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Payment Channel</label>
                      <select
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option>Bank Transfer</option>
                        <option>Credit Card (Online)</option>
                        <option>Cash at Centre</option>
                        <option>Cheque Payment</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PlusCircle size={14} />
                      <span>Log Payment Receipt</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-100 rounded-xl">
                    <Check className="mx-auto text-emerald-600 mb-1" size={24} />
                    <p className="text-xs font-bold text-emerald-800">Account Fully Settled</p>
                    <p className="text-[10px] text-emerald-600 mt-0.5">This student has zero outstanding fee balance.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Attendance Roster History Log list */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h4 className="font-extrabold text-slate-900 text-sm">Attendance History Log</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase">
                      <th className="p-3">Date</th>
                      <th className="p-3">Course</th>
                      <th className="p-3">Topic</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {studentAttendance?.records.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-slate-400">No records filed.</td>
                      </tr>
                    ) : (
                      studentAttendance?.records.map(record => (
                        <tr key={record.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold whitespace-nowrap">{record.date}</td>
                          <td className="p-3 font-semibold truncate max-w-[120px]">{record.course}</td>
                          <td className="p-3 text-slate-500">{record.topic}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded border font-bold text-[9px] ${getStatusLabel(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-slate-100 shadow-soft rounded-2xl p-12 text-center text-slate-400">
            Select a student from the directory roster.
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentDirectory;
