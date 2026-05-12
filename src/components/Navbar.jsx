import Colorfull from '../../hoc/Colorfull';
import { Link } from 'react-router-dom';


const bgColorMap = {
  rose: 'bg-rose-300',
  pink: 'bg-pink-300',
  fuchsia: 'bg-fuchsia-300',
  purple: 'bg-purple-300',
  violet: 'bg-violet-300',
  indigo: 'bg-indigo-300',
  blue: 'bg-blue-300',
  sky: 'bg-sky-300',
  cyan: 'bg-cyan-300',
  teal: 'bg-teal-300',
  emerald: 'bg-emerald-300',
  green: 'bg-green-300',
  lime: 'bg-lime-300',
  yellow: 'bg-yellow-300',
  amber: 'bg-amber-300',
  orange: 'bg-orange-300',
  red: 'bg-red-300',
};

const Navbar = ({ colorName = 'gray', onChangeColor }) => {
  const bgColor = bgColorMap[colorName] || 'bg-gray-800';

  return (
    <nav
      className={`py-3 px-6 rounded-lg mt-4 flex items-center justify-between shadow-md text-gray-700 transition-colors ${bgColor}`}
    >
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-gray-400 transition-colors">
        دفترچه تلفن
      </Link>
      {onChangeColor && (
        <button
          onClick={onChangeColor}
          className="bg-white bg-opacity-50 px-3 py-1 rounded text-sm hover:bg-opacity-30"
        >
          تغییر رنگ
        </button>
      )}
      <Link
        to="/contacts/add"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        + افزودن مخاطب
      </Link>
    </nav>
  );
};

export default Colorfull(Navbar);