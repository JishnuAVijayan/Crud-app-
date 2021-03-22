import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './userForm.css';

const UserForm = () => {
    const {isLightTheme, light, dark} = useContext(ThemeContext);
    const theme = isLightTheme ?  light : dark;

    const [userList, setUserList] = useState({
        user_id: "",
        firstname: "",
        lastname: "",
        email: ""
    });
    const [tableData, setTableData] = useState([]);


    const onChangeHandler = (e) => {
        setUserList({
            ...userList,
            [e.target.name]: e.target.value,
        });
    }
    const submitHandler = async (e) => {
        const res = await axios.post("http://localhost:4001/api/addpost", userList)
        console.log("submithandelr", res)
        e.preventDefault();
        // setUserList(updatedUser)
    };

    useEffect(() => {

        const getAllData = async () => {
            const res = await axios.get("http://localhost:4001/api/get");
            console.log(res.data.data);
            setTableData(res.data.data);
        }
        getAllData();
    }, [])

    const deleteHandler = async(id) =>{
        const res = await axios.delete(`http://localhost:4001/api/delete/${id}`)
        console.log(res, "inside DeleteHandler")
    }

    const editHandler = async(id) =>{
        const res = await axios.get(`http://localhost:4001/api/edit/${id}`)
        console.log(res, "inside EditHandler");
        setUserList(
            tableData.filter((item)=> item.user_id===id
            )[0]
        );

    }
    const updateHandler =async(id)=>{
        const res = await axios.post(`http://localhost:4001/updatepost/${id}`, userList);
        console.log(res, "inside UpdateHandler");
        setUserList({
            firstname:'',
            lastname:'',
            email:''
        })

    };

    return (
        <div >
            <div>
            {userList.user_id ? <h1>{userList.firstname}..!! You Can Update Here..!!</h1>: null}
            </div>
            
            <div style={{ background: theme.ui, color: theme.syntax }} className="form">
                <input type="text" name="firstname" onChange={onChangeHandler} placeholder="FirstName" value={userList.firstname} required />{" "} <br />
                <input type="text" name="lastname" onChange={onChangeHandler} placeholder="LastName" value={userList.lastname} required />{" "} <br />
                <input type="email" name="email" onChange={onChangeHandler} placeholder="Email" value={userList.email} required />{" "} <br />
                <div>
                    {userList.user_id ?
                        <button className="addUser" onClick={()=>updateHandler(userList.user_id)}> Update Here ..!</button>  : 
                        <button className="addUser" onClick={submitHandler}> Save Here..!</button> 
                     }
                    
                   
                </div>
                {tableData.map((item, index) => {
                    return (
                        <>
                            <div key={index} className="card">
                                <h2>{item.firstname}</h2>
                                <h4>{item.lastname}</h4>
                                <p>{item.email}</p>
                                <div className="updelbtn">
                                    <div>
                                        <button className="addUser" onClick={()=>editHandler(item.user_id)}>Edit</button>
                                    </div>
                                    <br/>
                                    <div>
                                        <button className="addUser" onClick={()=>deleteHandler(item.user_id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>



        </div>
    )
}

export default UserForm;
