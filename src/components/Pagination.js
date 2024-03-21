import { useSearchParams } from "react-router-dom";

function Pagination({page}) {
  
  const [_, setSearchParams] = useSearchParams();
  return ( 
    <div>
      <button onClick={() => setSearchParams({'page': page - 1})}>Page précédente</button>
      {page}
      <button onClick={() => setSearchParams({'page': page + 1})}>Page suivante</button>
    </div>
   );
}

export default Pagination;