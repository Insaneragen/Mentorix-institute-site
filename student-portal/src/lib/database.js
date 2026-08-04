import { supabase, createSecondaryClient } from './supabase';

export const getStudents = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('name');
  if (error) {
    console.error('Error fetching students:', error);
    return [];
  }
  return data;
};

export const getStudent = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }
  return data;
};

export const getCurrentStudent = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  return await getStudent(user.id);
};

export const getAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('date', { ascending: false });
  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
  return data;
};

export const addAnnouncement = async (newAnnouncement) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([newAnnouncement])
    .select()
    .single();
  if (error) {
    console.error('Error adding announcement:', error);
    return null;
  }
  return data;
};

export const getTimetable = async () => {
  const { data, error } = await supabase
    .from('timetable')
    .select('*');
  if (error) {
    console.error('Error fetching timetable:', error);
    return [];
  }
  return data;
};

export const toggleTimetableActive = async (id, activeStatus) => {
  const { data, error } = await supabase
    .from('timetable')
    .update({ active: activeStatus })
    .eq('id', id)
    .select();
  if (error) {
    console.error('Error toggling timetable:', error);
    return [];
  }
  return data;
};

export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*');
  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  return data;
};

export const getAttendance = async (studentId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Error fetching attendance:', error);
    return { overallPercentage: 100, presentCount: 0, lateCount: 0, absentCount: 0, records: [] };
  }
  
  // Calculate stats
  let pres = 0, late = 0, abs = 0;
  data.forEach(r => {
    if (r.status === 'Present') pres++;
    else if (r.status === 'Late') late++;
    else if (r.status === 'Absent') abs++;
  });
  
  const total = pres + late + abs;
  const overallPercentage = total > 0 ? Math.round(((pres + (late * 0.7)) / total) * 100) : 100;
  
  return {
    overallPercentage,
    presentCount: pres,
    lateCount: late,
    absentCount: abs,
    records: data
  };
};

export const getCurrentAttendance = async () => {
  const user = await getCurrentStudent();
  if (!user) return null;
  return await getAttendance(user.id);
};

export const addStudentAttendanceRecord = async (studentId, date, course, topic, status, note = "") => {
  const id = `att-${Date.now()}`;
  const { error } = await supabase
    .from('attendance')
    .insert([{ id, student_id: studentId, date, course, topic, status, note }]);
    
  if (error) {
    console.error('Error adding attendance:', error);
  }
};

export const getFinancials = async (studentId) => {
  const student = await getStudent(studentId);
  if (!student) return null;
  
  return {
    totalFee: student.fee_total || 0,
    paidAmount: student.fee_paid || 0,
    balanceAmount: student.fee_balance || 0,
    fee_statement_url: student.fee_statement_url || null,
    currency: "AED",
    payments: [] // We removed the individual payments table for simplicity
  };
};

export const getCurrentFinancials = async () => {
  const user = await getCurrentStudent();
  if (!user) return null;
  return await getFinancials(user.id);
};

export const uploadFeeStatement = async (studentId, file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${studentId}-${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  // Upload to Supabase Storage bucket 'fee-statements'
  const { error: uploadError } = await supabase.storage
    .from('fee-statements')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return null;
  }

  // Get public URL
  const { data } = supabase.storage
    .from('fee-statements')
    .getPublicUrl(filePath);

  const publicUrl = data.publicUrl;

  // Update profile with the URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ fee_statement_url: publicUrl })
    .eq('id', studentId);

  if (updateError) {
    console.error('Error updating profile with statement URL:', updateError);
    return null;
  }

  return publicUrl;
};

export const addNewStudent = async ({ name, email, phone, program, password, date_of_joining, fee_total }) => {
  const secondarySupabase = createSecondaryClient();
  
  const { data: authData, error: authError } = await secondarySupabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: 'student'
      }
    }
  });

  if (authError) {
    console.error('Error creating student auth:', authError);
    throw authError;
  }
  
  // The trigger handles inserting into profiles. We just need to update the extra fields.
  if (authData.user) {
    await supabase.from('profiles').update({
      phone,
      course_enrolled: program,
      date_of_joining,
      fee_total: Number(fee_total),
      fee_balance: Number(fee_total)
    }).eq('id', authData.user.id);
  }

  return authData.user;
};

export const getActiveSession = async (studentId) => {
  const { data, error } = await supabase
    .from('session_logs')
    .select('*')
    .eq('student_id', studentId)
    .eq('status', 'active')
    .maybeSingle();
    
  if (error) {
    console.error('Error fetching active session:', error);
    return null;
  }
  return data;
};

export const startSession = async (studentId) => {
  const { data, error } = await supabase
    .from('session_logs')
    .insert([{
      student_id: studentId,
      status: 'active'
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error starting session:', error);
    return null;
  }
  return data;
};

export const endSession = async (sessionId) => {
  const endTime = new Date();
  
  const { data: session, error: fetchError } = await supabase
    .from('session_logs')
    .select('start_time')
    .eq('id', sessionId)
    .single();
    
  if (fetchError || !session) {
    console.error('Error fetching session for end time:', fetchError);
    return null;
  }
  
  const startTime = new Date(session.start_time);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationMinutes = Math.round(durationMs / (1000 * 60));

  const { data, error } = await supabase
    .from('session_logs')
    .update({
      end_time: endTime.toISOString(),
      duration_minutes: durationMinutes,
      status: 'completed'
    })
    .eq('id', sessionId)
    .select()
    .single();
    
  if (error) {
    console.error('Error ending session:', error);
    return null;
  }
  return data;
};

export const getSessionLogs = async (studentId) => {
  const { data, error } = await supabase
    .from('session_logs')
    .select('*')
    .eq('student_id', studentId)
    .eq('status', 'completed')
    .order('start_time', { ascending: false });
    
  if (error) {
    console.error('Error fetching session logs:', error);
    return [];
  }
  return data;
};

export const getAllSessionLogs = async () => {
  const { data, error } = await supabase
    .from('session_logs')
    .select(`
      *,
      profiles (
        name,
        email
      )
    `)
    .order('start_time', { ascending: false });
    
  if (error) {
    console.error('Error fetching all session logs:', error);
    return [];
  }
  return data;
};
