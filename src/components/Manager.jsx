import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [form, setform] = useState({ site: "", username: '', password: '' })
    const passwordRef = useRef()

    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }
    };


    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const togglePasswordVisibilty = () => {
        setIsPasswordVisible(!isPasswordVisible);
        // if(passwordRef.current){
        //     passwordRef.current.type =isPasswordVisible ? "password":"text";
        // }

    }

    const savedPassword = () => {
        console.log(form)

    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }




    return (
        <>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_40%_20%,#fff_10%,#63e_100%)]"></div>



            <div className=" mx-auto px-4 py-5 max-w-5xl  ">

                <h1 className='text-4xl font-bold text-center flex justify-center items-center'>
                    My
                    <span className="text-purple-700">Password</span>
                    <span className="material-symbols-outlined text-4xl ">
                        key
                    </span>

                </h1>

                <p className='text-purple-900 flex justify-center gap-3 font-bold text-lg text-center'>Your own Password Manager

                </p>


                <div className="text-white flex flex-col  w-full p-4 justify-between gap-5">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-purple-500 text-black  p-4 py-2' type="text" name="site" id="" />

                    <div className="flex gap-5">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-purple-500 text-black  w-full p-4 py-2 ' type="text" name="username" id="" />

                        <div className="relative flex items-center ">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-purple-500 text-black w-full  p-4 py-2 ' type={isPasswordVisible ? 'text' : 'password'} name="password" id="" />
                            <span className="absolute  text-gray-400 cursor-pointer right-0   " onClick={togglePasswordVisibilty} ref={passwordRef}>
                                <span className="material-symbols-outlined  p-1 mx-1">
                                    {isPasswordVisible ? 'visibility_off' : 'visibility'}
                                </span>

                            </span>

                        </div>


                    </div>
                    <button className="bg-purple-700 rounded-full border-2 border-purple-900 m-auto w-1/2 p-4 py-2 flex justify-center gap-3 hover:bg-purple-600" onClick={savePassword}>Add Password
                        <span className="material-symbols-outlined">
                            add_task
                        </span>
                    </button>


                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-purple-800 text-white py-2'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className=' size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <span class="material-symbols-outlined">
                                                    content_copy
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className=' size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <span class="material-symbols-outlined">
                                                    content_copy
                                                </span>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <span class="material-symbols-outlined">
                                                edit_square
                                            </span>

                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span>

                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}

                </div>

            </div>

        </>
    )
}

export default Manager
