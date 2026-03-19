import ReactMarkdown from 'react-markdown';
const Answers = ({ ans,key }) => {
  console.log(ans, key);
  
  return (
   <>
   <ReactMarkdown>{ans}</ReactMarkdown>

   
    
   </>
  );
};

export default Answers;