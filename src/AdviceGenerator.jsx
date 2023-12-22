import { useState } from 'react';
import DividerDesktop from './components/DividerDesktop';
import DiceIcon from './components/DiceIcon';
import DividerPhone from './components/DividerPhone';

const AdviceGenerator = () => {
  const [state, setState] = useState("Click on the button");
  const [id, setId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      const result = await response.json();
      let output = result.slip.advice;
      let idNum = result.slip.id;

      console.log(result);
      setId(idNum);
      setState(output);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick() {
    fetchData();
  }

  return (
    <>
      <div className='flex justify-center items-center flex-col h-screen bg-[#1f2632]'>
        <div className="box">
          <div className="title manrope">Advice <span>#{id}</span></div>
          <div className="font-bold manrope advice">
            &ldquo;{isLoading ? 'Loading' : state}&rdquo;
          </div>
          <hr />
          <div className='hidden pt-5 sm:block'>
            <DividerDesktop />
          </div>
          <div className='block pb-5 sm:pt-5 sm:hidden'>
            <DividerPhone />
          </div>
          <div className='absolute -bottom-8'>
            <button onClick={handleClick} className='dice' disabled={isLoading}>
              <DiceIcon />
            </button>
          </div>
        </div>
        <div className="absolute text-xl manrope bottom-5 attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>.<br />
          Coded by <a href="https://github.com/hariFED" target="_blank" rel="noreferrer">Hariharan</a>.
        </div>
      </div>
    </>
  );
}

export default AdviceGenerator;
