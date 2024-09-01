import { FaArrowRight } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import RotatingText from '../../components/front/RotatingText';

const FrontHome = () => {
  return (
    <>
      <div className="bg-homebg min-h-screen flex flex-col items-center justify-center font-sofia">
        <h1 className="text-7xl font-bold mb-4 font-sofia">MegaMind</h1>
        <h2 className="text-3xl font-sofia">Acquire the Power of Knowledge</h2>
        <button className='text-blue-500 hover:bg-blue-950 hover:text-blue-200 mt-10 p-4 pr-6 pl-6 m-3 text-3xl rounded-3xl bg-[#101b3e] hover:scale-110 transition duration-300 ease-in-out transform'>
          Get Started <FaArrowRight className='inline text-blue-500 hover:scale-110'/>
        </button>
        {/* <h1 className="text-4xl font-bold font-sofia">
          Let's Elevate our <RotatingText />!
        </h1> */}
      </div>
    </>
  );
};

export default FrontHome