import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

const USERS = {
  'student@uni.edu':    { password:'123456', role:'student',    name:'أحمد محمد' },
  'instructor@uni.edu': { password:'123456', role:'instructor', name:'د. سارة الأحمدي' },
  'admin@uni.edu':      { password:'123456', role:'admin',      name:'مدير النظام' },
};

const LoginPage = () => {
  const { login, addToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [emailErr, setEmailErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const validateEmail = v => {
    if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setEmailErr('بريد إلكتروني غير صحيح');
    else setEmailErr('');
  };

  const handleLogin = async e => {
    e.preventDefault();
    if (emailErr) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const u = USERS[email];
    if (!u || u.password !== password) {
      addToast('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
      setLoading(false);
      return;
    }
    login({ email, name: u.name, role: u.role });
    addToast(`أهلاً بك، ${u.name}`, 'success');
    navigate(`/${u.role}`);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0F130C' }}>
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: '#2D4A22' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C8A96E, transparent 60%)' }} />
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center" style={{ background: '#C8A96E', borderRadius: '2px' }}>
              <i className="fa-solid fa-graduation-cap text-sm" style={{ color: '#2D4A22' }} />
            </div>
            <span className="font-bold text-white text-sm" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>جامعة المستقبل</span>
          </div>
        </div>
        <div>
          <blockquote className="text-3xl font-bold leading-snug mb-4"
            style={{ fontFamily: "'Noto Serif Arabic', Georgia, serif", color: 'rgba(245,240,232,0.9)' }}>
            "التعليم هو أقوى<br />سلاح يمكنك<br />استخدامه لتغيير العالم"
          </blockquote>
          <p className="text-sm" style={{ color: 'rgba(200,169,110,0.7)' }}>— نيلسون مانديلا</p>
        </div>
        <div className="flex gap-6 text-sm" style={{ color: 'rgba(245,240,232,0.5)', borderTop: '1px solid rgba(245,240,232,0.1)', paddingTop: '1.5rem' }}>
          {[['12,500+','طالب'],['350+','أستاذ'],['48','تخصص']].map(([v,l]) => (
            <div key={l}>
              <div className="font-bold text-lg" style={{ color: '#C8A96E', fontFamily: "'Noto Serif Arabic', serif" }}>{v}</div>
              <div>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 md:px-14 py-12">
        <div className="mb-10">
          <p className="text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.18em', fontFamily: "'JetBrains Mono', monospace" }}>
            البوابة الموحدة
          </p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif Arabic', serif", color: '#E8E2D8' }}>تسجيل الدخول</h1>
        </div>

        {/* Demo accounts */}
        <div className="p-4 mb-6 text-xs space-y-1.5" style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)', borderRadius: '2px' }}>
          <p className="font-semibold mb-2" style={{ color: '#C8A96E' }}>حسابات تجريبية:</p>
          {Object.entries(USERS).map(([em, u]) => (
            <button key={em} onClick={() => { setEmail(em); setPassword(u.password); }}
              className="block w-full text-right transition-colors py-0.5"
              style={{ color: '#8A8A7A', fontFamily: "'JetBrains Mono', monospace" }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8E2D8'}
              onMouseLeave={e => e.currentTarget.style.color = '#8A8A7A'}>
              {em} / 123456
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="input-label" style={{ color: '#8A8A7A' }}>البريد الإلكتروني</label>
            <input type="email" className="input-field" placeholder="you@uni.edu" value={email}
              onChange={e => { setEmail(e.target.value); validateEmail(e.target.value); }} />
            {emailErr && <p className="input-error">{emailErr}</p>}
          </div>
          <div>
            <label className="input-label" style={{ color: '#8A8A7A' }}>كلمة المرور</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} className="input-field pl-10" placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPass(v => !v)}
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#6A6A5A' }}>
                <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
              </button>
            </div>
          </div>
          <div className="flex justify-start">
            <button type="button" onClick={() => setForgot(true)}
              className="text-xs transition-colors" style={{ color: '#C8A96E' }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8E2D8'}
              onMouseLeave={e => e.currentTarget.style.color = '#C8A96E'}>
              نسيت كلمة المرور؟
            </button>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            {loading ? <><i className="fa-solid fa-spinner fa-spin" /> جاري الدخول...</> : 'دخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs transition-colors" style={{ color: '#6A6A5A' }}
            onMouseEnter={e => e.currentTarget.style.color = '#C8A96E'}
            onMouseLeave={e => e.currentTarget.style.color = '#6A6A5A'}>
            ← العودة للموقع
          </Link>
        </div>
      </div>

      <Modal isOpen={forgot} onClose={() => { setForgot(false); setForgotSent(false); }} title="استعادة كلمة المرور" size="sm">
        {!forgotSent ? (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: '#8A8A7A' }}>أدخل بريدك لإرسال رابط الاستعادة.</p>
            <input type="email" className="input-field" placeholder="you@uni.edu" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
            <button onClick={() => setForgotSent(true)} className="btn-primary w-full justify-center text-sm">إرسال الرابط</button>
          </div>
        ) : (
          <div className="text-center py-4">
            <i className="fa-solid fa-envelope text-3xl mb-4 block" style={{ color: '#2D4A22' }} />
            <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>تم الإرسال</h3>
            <p className="text-sm" style={{ color: '#8A8A7A' }}>راجع بريدك الإلكتروني.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoginPage;
