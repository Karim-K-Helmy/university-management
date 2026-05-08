import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

const STEPS = ['البيانات الشخصية', 'بيانات المؤهل', 'رفع المستندات', 'المراجعة والإرسال'];

const ApplyPage = () => {
  const { addToast } = useApp();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [appNumber] = useState('APP-' + Math.floor(100000 + Math.random() * 900000));
  const [agreed, setAgreed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', nationalId: '', birthDate: '', phone: '', email: '',
    gradYear: '', total: '', school: '', program: '',
    files: [],
  });
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName) e.firstName = 'مطلوب';
      if (!form.lastName) e.lastName = 'مطلوب';
      if (!form.nationalId || form.nationalId.length < 10) e.nationalId = 'رقم قومي غير صحيح';
      if (!form.email || !form.email.includes('@')) e.email = 'بريد إلكتروني غير صحيح';
      if (!form.phone) e.phone = 'مطلوب';
    }
    if (step === 1) {
      if (!form.gradYear) e.gradYear = 'مطلوب';
      if (!form.total) e.total = 'مطلوب';
      if (!form.program) e.program = 'مطلوب';
    }
    if (step === 2 && form.files.length === 0) {
      e.files = 'يرجى رفع ملف واحد على الأقل';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => s + 1); };
  const prevStep = () => setStep(s => s - 1);

  const handleFileDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer?.files || e.target.files || []);
    const valid = droppedFiles.filter(f => {
      if (f.size > 5 * 1024 * 1024) { addToast(`الملف ${f.name} أكبر من 5 ميجا`, 'error'); return false; }
      return true;
    });
    setForm(f => ({ ...f, files: [...f.files, ...valid.map(file => ({ file, name: file.name, size: file.size }))] }));
  };

  const removeFile = (i) => setForm(f => ({ ...f, files: f.files.filter((_, idx) => idx !== i) }));

  const handleSubmit = async () => {
    if (!agreed) { addToast('يرجى الموافقة على الشروط والأحكام', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSuccessModal(true);
  };

  const F = ({ label, id, error, children }) => (
    <div>
      <label htmlFor={id} className="input-label">{label}</label>
      {children}
      {error && <p className="input-error"><i className="fa-solid fa-circle-exclamation" /> {error}</p>}
    </div>
  );

  return (
    <div className="pt-24 pb-12 min-h-screen apply-page bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-tag"><i className="fa-solid fa-file-pen" /> بوابة القبول</span>
          <h1 className="section-title">طلب الالتحاق بالجامعة</h1>
          <p className="section-subtitle">أكمل الخطوات الأربع لتقديم طلبك</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-primary-600 text-white shadow-glow' : 'bg-gray-200 dark:bg-[#2A2E24] text-gray-700 dark:text-[#E8E2D8]'}`}>
                    {i < step ? <i className="fa-solid fa-check" /> : i + 1}
                  </div>
                  <span className={`text-[10px] mt-1 hidden md:block ${i === step ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-[#D8CCB8]'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${i < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-border'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-6 md:p-8 apply-card">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm">{step + 1}</span>
            {STEPS[step]}
          </h2>

          {/* Step 1 */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <F label="الاسم الأول *" id="fn" error={errors.firstName}>
                <input id="fn" className="input-field" value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="محمد" />
              </F>
              <F label="الاسم الأخير *" id="ln" error={errors.lastName}>
                <input id="ln" className="input-field" value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="الأحمدي" />
              </F>
              <F label="الرقم الوطني *" id="nid" error={errors.nationalId}>
                <input id="nid" className="input-field" value={form.nationalId} onChange={e => update('nationalId', e.target.value)} placeholder="1234567890" maxLength={10} />
              </F>
              <F label="تاريخ الميلاد *" id="bd" error={errors.birthDate}>
                <input type="date" id="bd" className="input-field" value={form.birthDate} onChange={e => update('birthDate', e.target.value)} />
              </F>
              <F label="رقم الجوال *" id="ph" error={errors.phone}>
                <input id="ph" className="input-field" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="05xxxxxxxx" />
              </F>
              <F label="البريد الإلكتروني *" id="em" error={errors.email}>
                <input type="email" id="em" className="input-field" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" />
              </F>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <F label="سنة التخرج *" id="gy" error={errors.gradYear}>
                <select id="gy" className="input-field" value={form.gradYear} onChange={e => update('gradYear', e.target.value)}>
                  <option value="">اختر السنة</option>
                  {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </F>
              <F label="المجموع / النسبة *" id="tot" error={errors.total}>
                <input id="tot" className="input-field" value={form.total} onChange={e => update('total', e.target.value)} placeholder="95.5" />
              </F>
              <F label="اسم المدرسة / المعهد" id="sch" error={errors.school}>
                <input id="sch" className="input-field" value={form.school} onChange={e => update('school', e.target.value)} placeholder="مدرسة..." />
              </F>
              <F label="البرنامج المرغوب *" id="prog" error={errors.program}>
                <select id="prog" className="input-field" value={form.program} onChange={e => update('program', e.target.value)}>
                  <option value="">اختر البرنامج</option>
                  <option value="cs">هندسة الحاسبات</option>
                  <option value="ds">علوم البيانات</option>
                  <option value="ba">إدارة الأعمال</option>
                  <option value="se">هندسة البرمجيات</option>
                  <option value="ai">الذكاء الاصطناعي</option>
                </select>
              </F>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="space-y-5">
              <div
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer ${dragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-dark-border hover:border-primary-400'}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <i className={`fa-solid fa-cloud-arrow-up text-5xl mb-3 block ${dragOver ? 'text-primary-500' : 'text-gray-300 dark:text-dark-border'}`} />
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">اسحب الملفات هنا أو انقر للاختيار</p>
                <p className="text-xs text-gray-500 dark:text-[#D8CCB8]">PDF, JPG, PNG — بحد أقصى 5 ميجابايت لكل ملف</p>
                <input id="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileDrop} />
              </div>
              {errors.files && <p className="input-error"><i className="fa-solid fa-circle-exclamation" /> {errors.files}</p>}

              {form.files.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">الملفات المرفوعة:</p>
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl">
                      <i className="fa-solid fa-file-check text-green-600" />
                      <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{f.name}</span>
                      <span className="text-xs text-gray-500 dark:text-[#D8CCB8]">{(f.size / 1024).toFixed(0)} KB</span>
                      <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600"><i className="fa-solid fa-xmark" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['الاسم الكامل', `${form.firstName} ${form.lastName}`],
                  ['الرقم الوطني', form.nationalId],
                  ['البريد الإلكتروني', form.email],
                  ['رقم الجوال', form.phone],
                  ['سنة التخرج', form.gradYear],
                  ['المجموع', form.total],
                  ['البرنامج', form.program],
                  ['المستندات', `${form.files.length} ملف`],
                ].map(([label, value]) => (
                  <div key={label} className="card p-4">
                    <p className="text-xs text-gray-500 dark:text-[#D8CCB8] mb-1">{label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{value || '—'}</p>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 rounded accent-primary-600 cursor-pointer" />
                <span className="text-sm text-gray-700 dark:text-[#D8CCB8]">
                  أوافق على <span className="text-primary-600 hover:underline cursor-pointer">الشروط والأحكام</span> وأؤكد أن جميع البيانات المدخلة صحيحة ودقيقة.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100 dark:border-dark-border">
            <button onClick={prevStep} disabled={step === 0} className={`btn-ghost ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
              <i className="fa-solid fa-chevron-right ml-1" /> السابق
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={nextStep} className="btn-primary">
                التالي <i className="fa-solid fa-chevron-left mr-1" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="btn-primary bg-green-600 hover:bg-green-700">
                {loading ? <><i className="fa-solid fa-spinner fa-spin" /> جاري الإرسال...</> : <><i className="fa-solid fa-paper-plane ml-1" /> إرسال الطلب</>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={successModal} onClose={() => setSuccessModal(false)} size="sm">
        <div className="text-center py-2">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fa-solid fa-circle-check text-green-600 text-4xl" />
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">تم استلام طلبك!</h3>
          <p className="text-gray-600 dark:text-[#D8CCB8] mb-2">رقم طلبك المرجعي:</p>
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl px-6 py-3 font-mono text-primary-700 dark:text-primary-300 text-lg font-bold mb-4">
            {appNumber}
          </div>
          <p className="text-gray-500 dark:text-[#D8CCB8] text-sm mb-6">سيتم التواصل معك عبر البريد الإلكتروني خلال 5 أيام عمل.</p>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="flex-1 btn-outline text-sm py-2">
              <i className="fa-solid fa-print ml-1" /> طباعة
            </button>
            <button onClick={() => { setSuccessModal(false); window.location.href = '/'; }} className="flex-1 btn-primary text-sm py-2">
              <i className="fa-solid fa-house ml-1" /> الرئيسية
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplyPage;
