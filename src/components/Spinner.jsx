import { createPortal } from 'react-dom';

const Spinner = () => {
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>,
    document.body   // ← اینجا Portal اتفاق می‌افتد
  );
};

export default Spinner;