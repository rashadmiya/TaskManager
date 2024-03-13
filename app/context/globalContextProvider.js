// 'use client'

// import React, { createContext, useContext, useState } from "react";
// import themes from "./themes";

// export const GlobalContext = createContext();
// export const GlobalUpdateContext = createContext();

// export const GlobalContextProvider = ({ children }) => {
//     const [selectedTheme, setSelectedTheme] = useState(0);
//     const theme = themes[selectedTheme];
//     return (
//         <GlobalContext.Provider value={{theme}}>
//             <GlobalUpdateContext.Provider value={{}}>
//                 {children}
//             </GlobalUpdateContext.Provider>
//         </GlobalContext.Provider>
//     )
// }

// export const useGlobalState = () => useContext(GlobalContext);
// export const useUpdateState = () => useContext(GlobalUpdateContext);


"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import toast from "react-hot-toast";
import taskManageApi from "@/network/taskManageApi";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    //   const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme];;

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const tempTasks = [];

            await taskManageApi.getTask().then((res) => {
                res.docs.map((d) => {
                    let task = d.data();
                    task.id = d.id;
                    tempTasks.push(task);
                })
            }).catch((err) => {
                console.log("err :", err)
            })


            // await taskManageApi.getAllTask().then((res) => {
            //     res.docs.map((d) => {
            //         let task = d.data();
            //         task.id = d.id;
            //         tempTasks.push(task);

            //     })
            // }).catch((err) => {
            //     console.log("err :", err)
            // })

            setTasks(tempTasks);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await taskManageApi.deleteTask(id)
            toast.success("Task deleted");

            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const updateTask = async (task) => {
        try {
            await taskManageApi.updateTask(task.id, task.isCompleted)
            toast.success("Task updated");
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

    React.useEffect(() => {
        allTasks();
    }, []);

    // React.useEffect(() => {
    //     if (user) 
    //     allTasks();
    //   }, [user]);

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                deleteTask,
                isLoading,
                completedTasks,
                importantTasks,
                incompleteTasks,
                updateTask,
                modal,
                openModal,
                closeModal,
                allTasks,
                collapsed,
                collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useUpdateState = () => useContext(GlobalUpdateContext);
