import UserContextProvider from "../../context/UserContext";
import Employees from "../../pages/Employees";

const EmployeeList = () => {
    return(
        <UserContextProvider>
            <Employees></Employees>
        </UserContextProvider>
    )
}

export default EmployeeList;