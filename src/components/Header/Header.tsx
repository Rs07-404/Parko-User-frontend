import Avatar from '@mui/material/Avatar';
import { useAuthContext } from '../../context/AuthContext';
import { useLogout } from '../../hooks/LogOutHook';
import { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
// import { Grow } from '@mui/material';

const Header = () => {
    const { authUser } = useAuthContext();
    // const { setShowMenu, showMenu } = useAppContext();
    const { loading, logout } = useLogout();
    const [ showMenu, setShowMenu ] = useState<boolean>(false);
    useEffect(()=>{
        // const hideMenu = (e:Event)=>{
        //     e.stopImmediatePropagation();
        //     setShowMenu(false)
        // }
        // if(showMenu){
        //     document.addEventListener("click",hideMenu)
        // }else{
        //     document.removeEventListener("click",hideMenu)
        // }

        // return (()=>{
        //     document.removeEventListener("click", hideMenu)
        // })
    },[showMenu])
    return(
        <div className="header">
            <div className="brand">
              <div>Park-</div>
              <div className="color-red">O</div>
            </div>
            <div className="profile">
            <div onClick={()=>{setShowMenu(!showMenu)}}>
                <Avatar alt={authUser? authUser.fullName:"NA"}  src="/static/images/avatar/1.jpg" />
            </div>
            <div className='logoutButton' onClick={logout}>{loading?"loading":"Logout"}</div>
            </div>
            { showMenu && <Menu/> }
        </div>
    )
}

export default Header;