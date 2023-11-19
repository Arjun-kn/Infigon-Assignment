import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
interface Istate{
    Component:React.ReactNode
}

let ProtectRoute:React.FC<Istate> = ({Component})=>{
    let navigate = useNavigate()
    useEffect(()=>{
        let login = localStorage.getItem('accessToken')
        if(!login){
            navigate("/",{ replace: true })

        }
    },[navigate])
    return(
      <div>{Component}</div>
    )
}

export default ProtectRoute