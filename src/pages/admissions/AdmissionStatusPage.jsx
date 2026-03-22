import React, { useState } from 'react';

const MOCK_RESULTS = {
  '1234567890': { status: 'accepted', college: 'كلية الحاسبات', program: 'علوم البيانات', studentId: 'STU-2024-1234', name: 'أحمد محمد الشمري' },
  '0987654321': { status: 'rejected', reason: 'لا يستوفي الحد الأدنى للمجموع المطلوب', name: 'فهد عبدالله القحطاني' },
  '1111111111': { status: 'pending', name: 'سارة نورة العتيبي' },
};

const AdmissionStatusPage = () => {
  const [nationalId, setNationalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!nationalId || nationalId.length < 10) { setError('يرجى إدخال رقم وطني صحيح (10 أرقام)'); return; }
    setError(''); setLoading(true); setResult(null);
    await new Promise(r => setTimeout(r, 1800));
    const found = MOCK_RESULTS[nationalId];
    setLoading(false);
    setResult(found || 'not-found');
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="section-tag"><i className="fa-solid fa-magnifying-glass" /> الاستعلام</span>
          <h1 className="section-title">نتيجة التقديم</h1>
          <p className="section-subtitle">أدخل رقمك الوطني للاستعلام عن حالة طلبك</p>
        </div>

        {/* Search Card */}
        <div className="card p-8 mb-6">
          <label className="input-label">الرقم الوطني</label>
          <div className="flex gap-3">
            <input
              className="input-field flex-1"
              placeholder="أدخل رقمك الوطني (10 أرقام)"
              value={nationalId}
              onChange={e => setNationalId(e.target.value)}
              maxLength={10}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} disabled={loading} className="btn-primary px-6 flex-shrink-0">
              {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <><i className="fa-solid fa-magnifying-glass ml-1" /> استعلام</>}
            </button>
          </div>
          {error && <p className="input-error mt-2"><i className="fa-solid fa-circle-exclamation" /> {error}</p>}
          <p className="text-xs text-gray-400 mt-3">
            للتجربة استخدم: <code className="bg-gray-100 dark:bg-dark-border px-2 py-0.5 rounded text-primary-600">1234567890</code> (مقبول) أو <code className="bg-gray-100 dark:bg-dark-border px-2 py-0.5 rounded text-red-500">0987654321</code> (مرفوض)
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="card p-8 space-y-4">
            <div className="skeleton h-6 w-1/2 mx-auto" />
            <div className="skeleton h-4 w-3/4 mx-auto" />
            <div className="skeleton h-4 w-2/3 mx-auto" />
            <div className="skeleton h-12 w-40 mx-auto rounded-xl" />
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <>
            {result === 'not-found' && (
              <div className="card p-8 text-center border-gray-200 dark:border-dark-border">
                <i className="fa-solid fa-circle-question text-5xl text-gray-300 dark:text-dark-border mb-4 block" />
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">لم يتم العثور على طلب</h3>
                <p className="text-gray-400 text-sm">تأكد من صحة الرقم الوطني المدخل</p>
              </div>
            )}

            {result.status === 'accepted' && (
              <div className="card p-8 text-center border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <i className="fa-solid fa-circle-check text-green-600 text-4xl" />
                </div>
                <h3 className="text-2xl font-black text-green-700 dark:text-green-400 mb-2">مبروك! تم قبولك 🎉</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">نحن سعداء بانضمامك إلى عائلة جامعة المستقبل</p>
                <div className="grid grid-cols-2 gap-4 text-right mb-6">
                  {[['الاسم', result.name], ['الكلية', result.college], ['البرنامج', result.program], ['الرقم الجامعي', result.studentId]].map(([k, v]) => (
                    <div key={k} className="bg-white dark:bg-dark-card rounded-xl p-4 border border-green-100 dark:border-green-900/30">
                      <p className="text-xs text-gray-400 mb-1">{k}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{v}</p>
                    </div>
                  ))}
                </div>
                <a href="/student" className="btn-primary bg-green-600 hover:bg-green-700 inline-flex">
                  <i className="fa-solid fa-right-to-bracket ml-1" /> الذهاب لبوابة الطالب
                </a>
              </div>
            )}

            {result.status === 'rejected' && (
              <div className="card p-8 text-center border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <i className="fa-solid fa-circle-xmark text-red-500 text-4xl" />
                </div>
                <h3 className="text-2xl font-black text-red-600 dark:text-red-400 mb-2">نأسف، لم يتم قبولك</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">السيد/ة: <strong>{result.name}</strong></p>
                {result.reason && (
                  <div className="bg-red-100 dark:bg-red-900/20 rounded-xl p-4 text-red-700 dark:text-red-300 text-sm mb-6">
                    <i className="fa-solid fa-info-circle ml-2" /> {result.reason}
                  </div>
                )}
                <p className="text-gray-400 text-sm">يمكنك التقديم مجدداً في الفصل القادم أو التواصل مع إدارة القبول.</p>
              </div>
            )}

            {result.status === 'pending' && (
              <div className="card p-8 text-center border-yellow-200 dark:border-yellow-900/50 bg-yellow-50/50 dark:bg-yellow-900/10">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <i className="fa-solid fa-clock text-yellow-500 text-4xl animate-pulse" />
                </div>
                <h3 className="text-2xl font-black text-yellow-700 dark:text-yellow-400 mb-2">طلبك قيد المراجعة</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">السيد/ة: <strong>{result.name}</strong></p>
                <p className="text-gray-400 text-sm">يرجى المتابعة لاحقاً. سيتم إشعارك عبر البريد الإلكتروني فور صدور القرار.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdmissionStatusPage;
