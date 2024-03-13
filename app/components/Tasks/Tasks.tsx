"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import React, { useEffect } from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "./TaskItem";
import { add, plus } from "@/app/utils/Icons";
import Modal from "../Modals/Modal";
import taskManageApi from "@/network/taskManageApi";
import { db } from "@/network/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  let titles = 'rashad';
  let description = 'rashadmiya@gmail.com';
  let isCompleted = 'hello there';
  let isImportant = '';
  let createdAt = Timestamp.now();


  const adddocToFirebase = async () => {
    console.log("fired")
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: titles,
        description: description,
        isCompleted: isCompleted,
        isImportant: isImportant,
        createdAt: createdAt
      });
      console.log("add document :", docRef);
      return true
    } catch (error) {
      console.log("error :", error)
    }
  }

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1 className="capitalize">{title}</h1>

      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>

      {/* <div className="tasks grid"> */}
      <div style={{ display: 'grid' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className="create-task" onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 14rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
