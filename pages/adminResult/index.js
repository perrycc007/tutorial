import CasesList from '../../components/CasesList'
import axios from 'axios';

const Result = (props) => {
    console.log(props)

  return (
    <>  
        <div>
          {props.cases.map((item)=>
              Object.entries(item).map(([key, value]) => 
                typeof(value) !=='object'?
                  <div><p>{key}:{value}</p></div>:
                    value?value.map((array)=>
                    typeof(array) !=='object'?
                      <p>{array}</p>:
                      array?Object.entries(array).map(([key, value])=>
                      <div><p>{key}:{value}</p></div>
                    )

                // <p>{array}</p>
              :''):''
            
          )
        )}
        </div>
        
        
         {/* <CasesList 
         cases={props.cases}
         type = 'cases'
         /> */}
    </>
  );
}


export async function getStaticProps() {
  // fetch data from an API
  const response = await axios.get(`http://localhost:3001/result`)
  // const result = response? response.data.result : []
  console.log(response.data,'result')
  return {
    props: {
      cases: response.data
    },
    revalidate: 1,
  };
};

export default Result;