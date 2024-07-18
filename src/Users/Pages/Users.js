import React,{useEffect,useState} from "react";

import UsersList from "../../Users/Components/UsersList";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { useHttpClients } from "../../Shared/hooks/http-hook";

const Users = () =>{
    const {isLoading,error,sendRequest,clearError}=useHttpClients();
    const [loadedUsers, setLoadedUsers] = useState();

    
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');

        setLoadedUsers(responseData.users);
      } catch (err) {} 
    };
    fetchUsers();
  }, [sendRequest]);
      
        return (
          <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
          </React.Fragment>
        );
      };
export default Users;
