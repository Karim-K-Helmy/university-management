import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error('ErrorBoundary:', err, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <i className="fa-solid fa-triangle-exclamation text-red-500 text-2xl" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">عذراً، حدث خطأ</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">حدث خطأ في تحميل هذا القسم.</p>
          <button onClick={() => this.setState({ hasError: false })} className="btn-primary py-2 px-4 text-sm">
            <i className="fa-solid fa-rotate-right ml-1" /> إعادة المحاولة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
