// Synchronized Database Simulation using LocalStorage
const STORAGE_KEYS = {
  STUDENTS: 'mentorix_db_students',
  ANNOUNCEMENTS: 'mentorix_db_announcements',
  COURSES: 'mentorix_db_courses',
  TIMETABLE: 'mentorix_db_timetable',
  ATTENDANCE_PREFIX: 'mentorix_db_attendance_',
  FINANCIALS_PREFIX: 'mentorix_db_financials_'
};

// Initial Mock Data Seed Definitions
const INITIAL_STUDENTS = [
  {
    id: "mock-user-123", // Ahmed's ID mapping his auth session
    name: "Ahmed Al Mansoori",
    studentId: "MTX-2026-9842",
    program: "Supply Chain & Logistics Management (Executive Pathway)",
    email: "ahmed.mansoori@mentorix.ae",
    phone: "+971 50 123 4567",
    joinedDate: "Jan 2026",
    avatarUrl: null
  },
  {
    id: "mock-student-2",
    name: "Sarah Connor",
    studentId: "MTX-2026-1049",
    program: "AI & Automation in Logistics",
    email: "sarah.connor@mentorix.ae",
    phone: "+971 50 987 6543",
    joinedDate: "Feb 2026",
    avatarUrl: null
  },
  {
    id: "mock-student-3",
    name: "Liam Neeson",
    studentId: "MTX-2026-5832",
    program: "Logistics & Supply Chain Management",
    email: "liam.neeson@mentorix.ae",
    phone: "+971 50 555 4321",
    joinedDate: "Mar 2026",
    avatarUrl: null
  }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Midterm Exam Schedules & Instructions",
    date: "2026-08-01",
    body: "All students enrolled in professional pathways should review their schedules for upcoming midterm exams starting August 10. Make sure to carry your Mentorix Student ID badge for in-person evaluations. Remote students will receive login links via email 15 minutes before their scheduled slots.",
    category: "Academic",
    badgeColor: "bg-red-50 text-red-700 border-red-100"
  },
  {
    id: 2,
    title: "Special AI Masterclass with Industry Experts",
    date: "2026-07-28",
    body: "We are hosting an exclusive webinar on 'AI in Global Trade Operations' this Saturday at 11:00 AM. Guest speaker Dr. Sarah Jenkins (Head of AI at DP World) will share insights on automated port logistics. You can join directly using the link in the Live Classes tab.",
    category: "Event",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    id: 3,
    title: "KHDA Compliance Attestation Submissions",
    date: "2026-07-25",
    body: "Please ensure your passport copies, residency visas, and attested previous graduation certificates are uploaded to the administrative portal or submitted to the Dubai Centre main office by August 15. This is required for official registration and KHDA certification approval.",
    category: "Admin",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100"
  },
  {
    id: 4,
    title: "Campus Maintenance & Online Weekend Classes",
    date: "2026-07-20",
    body: "Due to routine electrical safety upgrades and maintenance, the Dubai Centre physical campus will be closed on Saturday, August 8. All scheduled classes for that day will run remotely via Zoom or Google Meet. Physical classes will resume on Monday, August 10.",
    category: "Notice",
    badgeColor: "bg-slate-50 text-slate-700 border-slate-100"
  }
];

const INITIAL_TIMETABLE = [
  {
    id: "t-1",
    day: "Monday",
    courseName: "Logistics & Supply Chain Management",
    code: "LSCM-401",
    time: "19:00 - 21:00 (UAE)",
    room: "Virtual Classroom 1",
    instructor: "Dr. Rachel Green",
    meetUrl: "https://meet.google.com/abc-defg-hij",
    active: true
  },
  {
    id: "t-2",
    day: "Wednesday",
    courseName: "AI & Automation in Logistics",
    code: "AIL-402",
    time: "19:00 - 21:00 (UAE)",
    room: "Dubai Centre - Room 204",
    instructor: "Prof. Alan Turing",
    meetUrl: "https://meet.google.com/xyz-pdqr-lmn",
    active: false
  },
  {
    id: "t-3",
    day: "Saturday",
    courseName: "Supply Chain Risk Management & Compliance",
    code: "SCRM-403",
    time: "10:00 - 13:00 (UAE)",
    room: "Virtual Classroom 2",
    instructor: "Dr. Rachel Green",
    meetUrl: "https://meet.google.com/mno-pqrs-tuv",
    active: false
  }
];

const INITIAL_COURSES = [
  {
    id: "lscm-401",
    name: "Logistics & Supply Chain Management",
    code: "LSCM-401",
    progress: 75,
    instructor: "Dr. Rachel Green",
    studyMaterials: [
      { id: "sm-1", name: "Global Trade Logistics Handbook 2026.pdf", size: "4.2 MB", type: "PDF" },
      { id: "sm-2", name: "Warehouse Automation & Sorting Systems.pdf", size: "2.8 MB", type: "PDF" },
      { id: "sm-3", name: "Customs Clearances & Documentation Checklist UAE.docx", size: "1.1 MB", type: "DOCX" }
    ],
    lectureNotes: [
      { id: "ln-1", name: "Week 1: Fundamentals of SCM & Material Flows", content: "Introduction to supply chain pipelines, upstream and downstream flows, and the strategic role of logistics in UAE trade hubs. We analyzed Jebel Ali Port's shipping efficiency and multimodal transport structures." },
      { id: "ln-2", name: "Week 2: Incoterms 2020 Deep Dive", content: "Comprehensive analysis of modern Incoterms (EXW, FOB, CIF, DDP). Focused on cost allocations, transfer of risk points, and marine insurance requirements. Essential for import/export administrative clearances." },
      { id: "ln-3", name: "Week 3: Procurement Strategy & Vendor Selection", content: "Overview of commercial bidding procedures, strategic sourcing models, and supplier performance evaluation metrics. Case study on DP World's procurement automation systems." }
    ],
    recordings: [
      { id: "rec-1", title: "LSCM Lecture: Container Shipping & Freight Forwarding", date: "2026-07-27", duration: "1h 45m", thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=300&auto=format&fit=crop" },
      { id: "rec-2", title: "LSCM Lecture: Incoterms 2020 Case Analysis & Risk Management", date: "2026-07-20", duration: "2h 00m", thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=300&auto=format&fit=crop" },
      { id: "rec-3", title: "LSCM Lecture: Warehouse Operations & RFID Asset Integration", date: "2026-07-13", duration: "1h 30m", thumbnail: "https://images.unsplash.com/photo-1553413719-875871274712?q=80&w=300&auto=format&fit=crop" }
    ]
  },
  {
    id: "ail-402",
    name: "AI & Automation in Logistics",
    code: "AIL-402",
    progress: 40,
    instructor: "Prof. Alan Turing",
    studyMaterials: [
      { id: "sm-4", name: "AI Algorithms in Route Optimization & Planning.pdf", size: "3.5 MB", type: "PDF" },
      { id: "sm-5", name: "Predictive Analytics for Inventory Management.pdf", size: "5.1 MB", type: "PDF" }
    ],
    lectureNotes: [
      { id: "ln-4", name: "Week 1: Machine Learning Basics in Global Trade", content: "Understanding regression models for forecasting stock demand and neural networks for automated container sorting. Discussed how retail networks use ML to avoid stockouts." },
      { id: "ln-5", name: "Week 2: Route Optimization & Fleet Telematics", content: "Using GIS datasets and pathfinding algorithms (like Dijkstra's and A* Search) to minimize fuel consumption and delivery times. Analyzed last-mile delivery challenges in dense GCC urban areas." }
    ],
    recordings: [
      { id: "rec-4", title: "AIL Lecture: Predictive Analytics for Stock Levels & Forecasting", date: "2026-07-29", duration: "1h 55m", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop" },
      { id: "rec-5", title: "AIL Lecture: Route Optimization Workshop & Telematics", date: "2026-07-22", duration: "1h 40m", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop" }
    ]
  }
];

const INITIAL_ATTENDANCE = {
  "mock-user-123": {
    overallPercentage: 88,
    presentCount: 6,
    lateCount: 1,
    absentCount: 1,
    records: [
      { id: "att-1", date: "2026-07-29", course: "AI & Automation in Logistics", topic: "Predictive Analytics & Forecasting", status: "Present" },
      { id: "att-2", date: "2026-07-27", course: "Logistics & Supply Chain Management", topic: "Freight Forwarding Operations", status: "Present" },
      { id: "att-3", date: "2026-07-22", course: "AI & Automation in Logistics", topic: "Route Optimization Algorithms", status: "Late" },
      { id: "att-4", date: "2026-07-20", course: "Logistics & Supply Chain Management", topic: "Incoterms Case Study Analysis", status: "Present" },
      { id: "att-5", date: "2026-07-15", course: "AI & Automation in Logistics", topic: "Machine Learning Basics in Trade", status: "Present" },
      { id: "att-6", date: "2026-07-13", course: "Logistics & Supply Chain Management", topic: "Warehouse Management Systems", status: "Absent", note: "Approved Medical Leave" },
      { id: "att-7", date: "2026-07-06", course: "Logistics & Supply Chain Management", topic: "Introduction to Supply Chains", status: "Present" }
    ]
  },
  "mock-student-2": {
    overallPercentage: 100,
    presentCount: 3,
    lateCount: 0,
    absentCount: 0,
    records: [
      { id: "att-s2-1", date: "2026-07-29", course: "AI & Automation in Logistics", topic: "Predictive Analytics & Forecasting", status: "Present" },
      { id: "att-s2-2", date: "2026-07-22", course: "AI & Automation in Logistics", topic: "Route Optimization Algorithms", status: "Present" },
      { id: "att-s2-3", date: "2026-07-15", course: "AI & Automation in Logistics", topic: "Machine Learning Basics in Trade", status: "Present" }
    ]
  },
  "mock-student-3": {
    overallPercentage: 66,
    presentCount: 2,
    lateCount: 0,
    absentCount: 1,
    records: [
      { id: "att-s3-1", date: "2026-07-27", course: "Logistics & Supply Chain Management", topic: "Freight Forwarding Operations", status: "Present" },
      { id: "att-s3-2", date: "2026-07-20", course: "Logistics & Supply Chain Management", topic: "Incoterms Case Study Analysis", status: "Present" },
      { id: "att-s3-3", date: "2026-07-13", course: "Logistics & Supply Chain Management", topic: "Warehouse Management Systems", status: "Absent" }
    ]
  }
};

const INITIAL_FINANCIALS = {
  "mock-user-123": {
    totalFee: 10000,
    paidAmount: 7500,
    balanceAmount: 2500,
    currency: "AED",
    payments: [
      { id: "RCPT-9821", date: "2026-06-15", amount: 2500, method: "Credit Card (Online)", status: "Completed" },
      { id: "RCPT-8419", date: "2026-04-10", amount: 2500, method: "Bank Transfer", status: "Completed" },
      { id: "RCPT-7301", date: "2026-01-08", amount: 2500, method: "Cash at Centre", status: "Completed" }
    ]
  },
  "mock-student-2": {
    totalFee: 12000,
    paidAmount: 12000,
    balanceAmount: 0,
    currency: "AED",
    payments: [
      { id: "RCPT-2001", date: "2026-02-10", amount: 12000, method: "Bank Transfer", status: "Completed" }
    ]
  },
  "mock-student-3": {
    totalFee: 10000,
    paidAmount: 5000,
    balanceAmount: 5000,
    currency: "AED",
    payments: [
      { id: "RCPT-3001", date: "2026-03-20", amount: 5000, method: "Cheque Payment", status: "Completed" }
    ]
  }
};

// Database Init Helpers
const initItem = (key, fallbackData) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(fallbackData));
  }
};

// Auto seed on import
initItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
initItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
initItem(STORAGE_KEYS.TIMETABLE, INITIAL_TIMETABLE);
initItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);

Object.keys(INITIAL_ATTENDANCE).forEach(studentId => {
  initItem(`${STORAGE_KEYS.ATTENDANCE_PREFIX}${studentId}`, INITIAL_ATTENDANCE[studentId]);
});

Object.keys(INITIAL_FINANCIALS).forEach(studentId => {
  initItem(`${STORAGE_KEYS.FINANCIALS_PREFIX}${studentId}`, INITIAL_FINANCIALS[studentId]);
});

// Database API Queries
export const getStudents = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS));
};

export const getStudent = (id) => {
  const students = getStudents();
  return students.find(s => s.id === id) || students[0];
};

export const getAnnouncements = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS));
};

export const addAnnouncement = (newAnnouncement) => {
  const announcements = getAnnouncements();
  const nextId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
  const item = { id: nextId, ...newAnnouncement };
  announcements.unshift(item); // Put at top
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  return item;
};

export const getTimetable = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.TIMETABLE));
};

export const toggleTimetableActive = (id, activeStatus) => {
  const timetable = getTimetable();
  const updated = timetable.map(item => {
    if (item.id === id) {
      return { ...item, active: activeStatus };
    }
    return item;
  });
  localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(updated));
  return updated;
};

export const getCourses = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES));
};

export const getAttendance = (studentId) => {
  const key = `${STORAGE_KEYS.ATTENDANCE_PREFIX}${studentId}`;
  if (!localStorage.getItem(key)) {
    // Generate default attendance
    localStorage.setItem(key, JSON.stringify({ overallPercentage: 100, presentCount: 0, lateCount: 0, absentCount: 0, records: [] }));
  }
  return JSON.parse(localStorage.getItem(key));
};

export const addStudentAttendanceRecord = (studentId, date, course, topic, status, note = "") => {
  const key = `${STORAGE_KEYS.ATTENDANCE_PREFIX}${studentId}`;
  const attendance = getAttendance(studentId);
  
  const record = {
    id: `att-manual-${Date.now()}`,
    date,
    course,
    topic,
    status,
    note
  };

  attendance.records.unshift(record);

  // Recalculate statistics
  let pres = 0, late = 0, abs = 0;
  attendance.records.forEach(r => {
    if (r.status === 'Present') pres++;
    else if (r.status === 'Late') late++;
    else if (r.status === 'Absent') abs++;
  });

  attendance.presentCount = pres;
  attendance.lateCount = late;
  attendance.absentCount = abs;

  const total = pres + late + abs;
  attendance.overallPercentage = total > 0 ? Math.round(((pres + (late * 0.7)) / total) * 100) : 100;

  localStorage.setItem(key, JSON.stringify(attendance));
  return attendance;
};

export const getFinancials = (studentId) => {
  const key = `${STORAGE_KEYS.FINANCIALS_PREFIX}${studentId}`;
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify({ totalFee: 10000, paidAmount: 0, balanceAmount: 10000, currency: "AED", payments: [] }));
  }
  return JSON.parse(localStorage.getItem(key));
};

export const addFinancialPayment = (studentId, amount, method) => {
  const key = `${STORAGE_KEYS.FINANCIALS_PREFIX}${studentId}`;
  const financials = getFinancials(studentId);

  const payment = {
    id: `RCPT-MANUAL-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    amount: Number(amount),
    method,
    status: "Completed"
  };

  financials.payments.unshift(payment);
  financials.paidAmount += Number(amount);
  financials.balanceAmount = Math.max(0, financials.totalFee - financials.paidAmount);

  localStorage.setItem(key, JSON.stringify(financials));
  return financials;
};

export const addNewStudent = ({ name, email, phone, program }) => {
  const students = getStudents();
  
  const id = `mock-student-${Date.now()}`;
  const studentId = `MTX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const joinedDate = new Date().toLocaleString('en-US', { month: 'short' }) + ' ' + new Date().getFullYear();
  
  const newStudent = {
    id,
    name,
    studentId,
    program,
    email,
    phone,
    joinedDate,
    avatarUrl: null
  };

  students.push(newStudent);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));

  // Initialize empty attendance
  localStorage.setItem(`${STORAGE_KEYS.ATTENDANCE_PREFIX}${id}`, JSON.stringify({
    overallPercentage: 100,
    presentCount: 0,
    lateCount: 0,
    absentCount: 0,
    records: []
  }));

  // Initialize empty financials
  localStorage.setItem(`${STORAGE_KEYS.FINANCIALS_PREFIX}${id}`, JSON.stringify({
    totalFee: 10000,
    paidAmount: 0,
    balanceAmount: 10000,
    currency: "AED",
    payments: []
  }));

  return newStudent;
};

// Legacy object mock mappings for backwards compatibility with student layout
export const mockStudent = getStudent("mock-user-123");
export const mockAnnouncements = getAnnouncements();
export const mockTimetable = getTimetable();
export const mockCourses = getCourses();
export const mockAttendance = getAttendance("mock-user-123");
export const mockFinancials = getFinancials("mock-user-123");
