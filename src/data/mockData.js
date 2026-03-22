// ══════════════════════════════════════════
// MOCK DATA - University Portal
// ══════════════════════════════════════════

export const STATS = [
  { id: 1, value: 12500, label: 'طالب مسجل', icon: 'fa-graduation-cap', color: 'from-primary-500 to-primary-700' },
  { id: 2, value: 350,   label: 'عضو هيئة تدريس', icon: 'fa-chalkboard-teacher', color: 'from-accent-500 to-accent-600' },
  { id: 3, value: 48,    label: 'برنامج أكاديمي', icon: 'fa-book-open', color: 'from-gold-500 to-gold-600' },
  { id: 4, value: 92,    label: 'نسبة توظيف %', icon: 'fa-briefcase', color: 'from-green-500 to-green-600' },
  { id: 5, value: 180,   label: 'شركة شريكة', icon: 'fa-handshake', color: 'from-purple-500 to-purple-600' },
  { id: 6, value: 2400,  label: 'منحة دراسية', icon: 'fa-award', color: 'from-pink-500 to-pink-600' },
];

export const PROGRAMS = [
  {
    id: 1, title: 'هندسة الحاسبات', college: 'كلية الهندسة',
    description: 'برنامج متكامل يجمع بين علوم الحاسب والهندسة الكهربية لتخريج مهندسين متميزين.',
    icon: 'fa-microchip', duration: '5 سنوات', mode: 'انتظام',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    color: 'from-blue-600 to-blue-800', seats: 60,
  },
  {
    id: 2, title: 'علوم البيانات', college: 'كلية الحاسبات',
    description: 'تعلّم تحليل البيانات الضخمة وبناء نماذج الذكاء الاصطناعي بأحدث الأدوات.',
    icon: 'fa-chart-bar', duration: '4 سنوات', mode: 'انتظام',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    color: 'from-purple-600 to-purple-800', seats: 80,
  },
  {
    id: 3, title: 'إدارة الأعمال', college: 'كلية إدارة الأعمال',
    description: 'تأهيل قادة الأعمال المستقبليين بمهارات الإدارة الحديثة والريادة.',
    icon: 'fa-chart-line', duration: '4 سنوات', mode: 'انتظام',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
    color: 'from-green-600 to-green-800', seats: 100,
  },
  {
    id: 4, title: 'هندسة البرمجيات', college: 'كلية الهندسة',
    description: 'بناء تطبيقات متقدمة وتعلّم منهجيات التطوير الحديثة كـ Agile وDevOps.',
    icon: 'fa-code', duration: '4 سنوات', mode: 'انتظام',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
    color: 'from-orange-600 to-orange-800', seats: 70,
  },
  {
    id: 5, title: 'الذكاء الاصطناعي', college: 'كلية الحاسبات',
    description: 'أكثر التخصصات طلباً في سوق العمل. تعلّم ML, Deep Learning, NLP.',
    icon: 'fa-robot', duration: '4 سنوات', mode: 'اونلاين',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600',
    color: 'from-red-600 to-red-800', seats: 50,
  },
  {
    id: 6, title: 'ريادة الأعمال', college: 'كلية إدارة الأعمال',
    description: 'من الفكرة للمشروع الناجح. تعلّم بناء الشركات الناشئة وجذب الاستثمارات.',
    icon: 'fa-rocket', duration: '2 سنوات', mode: 'مسائي',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
    color: 'from-teal-600 to-teal-800', seats: 45,
  },
];

export const NEWS = [
  {
    id: 1,
    title: 'الجامعة تحصل على اعتماد دولي من المنظمة العربية لضمان الجودة',
    date: '2024-03-10', category: 'إنجازات',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
    excerpt: 'في خطوة تاريخية، حصلت جامعة المستقبل على الاعتماد الدولي المرموق...',
  },
  {
    id: 2,
    title: 'انطلاق مسابقة الابتكار والبرمجة للطلاب لعام 2024',
    date: '2024-03-05', category: 'فعاليات',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600',
    excerpt: 'تعلن الجامعة عن انطلاق النسخة الثالثة من مسابقة الابتكار...',
  },
  {
    id: 3,
    title: 'توقيع اتفاقية تعاون مع شركة مايكروسوفت للتدريب التقني',
    date: '2024-02-28', category: 'شراكات',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
    excerpt: 'وقّعت الجامعة اتفاقية شراكة استراتيجية مع مايكروسوفت...',
  },
  {
    id: 4,
    title: 'افتتاح مختبر الواقع الافتراضي والمعزز في كلية الهندسة',
    date: '2024-02-20', category: 'تطوير',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600',
    excerpt: 'افتتحت الجامعة اليوم مختبراً متطوراً للواقع الافتراضي...',
  },
];

export const FACULTY = [
  { id: 1, name: 'أ.د. محمد العمري', title: 'عميد كلية الهندسة', department: 'هندسة الحاسبات', email: 'omari@uni.edu', image: 'https://ui-avatars.com/api/?name=محمد+العمري&background=4f46e5&color=fff&size=200' },
  { id: 2, name: 'د. سارة الأحمدي', title: 'رئيسة قسم علوم البيانات', department: 'كلية الحاسبات', email: 'ahmadi@uni.edu', image: 'https://ui-avatars.com/api/?name=سارة+الأحمدي&background=f97316&color=fff&size=200' },
  { id: 3, name: 'د. خالد السعدي', title: 'أستاذ الذكاء الاصطناعي', department: 'كلية الحاسبات', email: 'saadi@uni.edu', image: 'https://ui-avatars.com/api/?name=خالد+السعدي&background=059669&color=fff&size=200' },
  { id: 4, name: 'أ.د. نورة المنصور', title: 'عميدة كلية إدارة الأعمال', department: 'إدارة الأعمال', email: 'mansour@uni.edu', image: 'https://ui-avatars.com/api/?name=نورة+المنصور&background=7c3aed&color=fff&size=200' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'أحمد الشمري', program: 'هندسة البرمجيات', year: 2023, text: 'الجامعة غيّرت مسيرتي المهنية بالكامل. الأساتذة متميزون والمناخ الأكاديمي يحفّز على الابتكار.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=أحمد+الشمري&background=4f46e5&color=fff' },
  { id: 2, name: 'فاطمة القحطاني', program: 'علوم البيانات', year: 2023, text: 'حصلت على وظيفة في شركة كبرى قبل التخرج بثلاثة أشهر! البرنامج يركز على التطبيق العملي.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=فاطمة+القحطاني&background=f97316&color=fff' },
  { id: 3, name: 'عمر الحربي', program: 'إدارة الأعمال', year: 2022, text: 'المنح الدراسية والدعم المقدم للطلاب لا مثيل لهم. أنصح كل طالب طموح بالالتحاق بهذه الجامعة.', rating: 5, avatar: 'https://ui-avatars.com/api/?name=عمر+الحربي&background=059669&color=fff' },
];

export const PARTNERS = [
  { id: 1, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png' },
  { id: 2, name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png' },
  { id: 3, name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
  { id: 4, name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png' },
  { id: 5, name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/200px-Oracle_logo.svg.png' },
];

export const TIMELINE = [
  { year: 2010, title: 'التأسيس', desc: 'تأسست جامعة المستقبل بكليتين ومئة طالب في أول دفعة.' },
  { year: 2013, title: 'التوسع الأول', desc: 'إضافة كلية إدارة الأعمال ومركز البحث العلمي.' },
  { year: 2016, title: 'الاعتماد الوطني', desc: 'الحصول على الاعتماد الأكاديمي الوطني الكامل.' },
  { year: 2019, title: 'الشراكات الدولية', desc: 'توقيع 50+ اتفاقية مع جامعات عالمية مرموقة.' },
  { year: 2021, title: 'التحول الرقمي', desc: 'إطلاق منصة التعليم الإلكتروني الشاملة.' },
  { year: 2024, title: 'الاعتماد الدولي', desc: 'الحصول على الاعتماد من المنظمة العربية لضمان الجودة.' },
];

export const STUDENT_COURSES = [
  { id: 'cs401', name: 'تصميم قواعد البيانات', code: 'CS401', doctor: 'د. سارة الأحمدي', credits: 3, lectures: 8, grade: 88 },
  { id: 'cs402', name: 'هندسة البرمجيات المتقدمة', code: 'CS402', doctor: 'د. خالد السعدي', credits: 3, lectures: 6, grade: 92 },
  { id: 'cs403', name: 'الذكاء الاصطناعي', code: 'CS403', doctor: 'أ.د. محمد العمري', credits: 3, lectures: 10, grade: null },
  { id: 'math301', name: 'إحصاء وإحتمالات', code: 'MATH301', doctor: 'د. نورة المنصور', credits: 2, lectures: 7, grade: 79 },
];

export const SCHEDULE = [
  { id: 1, course: 'تصميم قواعد البيانات', day: 'الأحد', time: '9:00 - 10:30', room: 'E-204', color: 'bg-primary-600' },
  { id: 2, course: 'هندسة البرمجيات المتقدمة', day: 'الأحد', time: '11:00 - 12:30', room: 'C-101', color: 'bg-accent-500' },
  { id: 3, course: 'الذكاء الاصطناعي', day: 'الثلاثاء', time: '9:00 - 10:30', room: 'A-301', color: 'bg-green-600' },
  { id: 4, course: 'إحصاء وإحتمالات', day: 'الثلاثاء', time: '12:00 - 1:30', room: 'B-105', color: 'bg-purple-600' },
  { id: 5, course: 'تصميم قواعد البيانات', day: 'الأربعاء', time: '10:00 - 11:30', room: 'E-204', color: 'bg-primary-600' },
  { id: 6, course: 'الذكاء الاصطناعي', day: 'الخميس', time: '9:00 - 10:30', room: 'A-301', color: 'bg-green-600' },
];

export const ADMIN_USERS = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@uni.edu', role: 'student', college: 'كلية الحاسبات', status: 'active', gpa: 3.7 },
  { id: 2, name: 'سارة علي', email: 'sara@uni.edu', role: 'instructor', college: 'كلية الهندسة', status: 'active', gpa: null },
  { id: 3, name: 'خالد عمر', email: 'khalid@uni.edu', role: 'student', college: 'كلية إدارة الأعمال', status: 'active', gpa: 3.2 },
  { id: 4, name: 'نورة محمد', email: 'noura@uni.edu', role: 'admin', college: '-', status: 'active', gpa: null },
  { id: 5, name: 'عمر الحسن', email: 'omar@uni.edu', role: 'student', college: 'كلية الحاسبات', status: 'disabled', gpa: 2.8 },
];
