// import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
// import { checkHeading, replaceHeadingStars } from '../helper';
const Answers = ({ ans, type}) => {
 
  // const [heading ,setHeading] = useState(false);
  // const[answer,setAnswer] = useState(ans);
// console.log(key);
// console.log(totalResult);

  // useEffect(()=>{
  //   if(checkHeading(ans)){
  //     setHeading(true);
  //     setAnswer(replaceHeadingStars(ans))
  //   }
  // },[])
 
  return (
   <>
   <ReactMarkdown >{ans}</ReactMarkdown>
   {/* {
    key ==0 && totalResult >1 ? <span className='text-6xl font-semibold'>{answer}</span> : 
    heading ? <span className='pt-2 block text-xl font-bold text-white'>{answer}</span> : 
    <span className='pl-5 '>{answer}</span>

   } */}

   </>
  );
};

export default Answers;