import { useEffect } from 'react';
import NewsBox from "../../components/NewsBox";

export default function Message() {

    useEffect(() => {

        const goTop = () => { window.scrollTo({ top: 0, left: 0, behavior: 'auto'})};
  
        goTop();
  
     }, []);  

    return (
        <div>
            <NewsBox />
        </div>
    )
}