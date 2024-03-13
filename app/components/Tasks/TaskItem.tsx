"use client";
import { useGlobalState } from "@/app/context/globalContextProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme, deleteTask, updateTask } = useGlobalState();

  const handleDelete = (id: string) => {
    const proceed = window.confirm("Are you sure you want to delete this task?");
    if (proceed) {
      deleteTask(id);
    } else {
      console.log("Cancelled.");
    }
  }

  const incompleteHandler = (id: string) => {
    const proceed = window.confirm("This task will be mark as completed, click OK to proceed");
    if (proceed) {
      const task = {
        id,
        isCompleted: !isCompleted,
      };

      updateTask(task);
    } else {
      console.log("Cancelled.");
    }
  }

  const completeHandler = (id: string) => {
    const proceed = window.confirm("This task will be mark as incomplete, click OK to proceed");
    if (proceed) {
      const task = {
        id,
        isCompleted: !isCompleted,
      };

      updateTask(task);
    } else {
      console.log("Cancelled.");
    }
  }


  return (
    <TaskItemStyled theme={theme} >
      {title && title.length > 30 ? <h2 className="capitalize font-bold">{`${title.slice(0, 30)}...`}</h2> : <h2 className="capitalize font-bold">{title}</h2>}
      {description && description.length > 130 ? <p className="text-sm text-justify">{`${description.slice(0, 130)}...`}</p> : <p>{description}</p>}
      <p className="date text-sm">{formatDate(date)}</p>

      <div className="task-footer justify-between">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              completeHandler(id)
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              incompleteHandler(id)
            }}
          >
            Incomplete
          </button>
        )}
        {/* <button className="edit">{edit}</button> */}
        <button
          className="delete text-sm"
          onClick={() => {
            handleDelete(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 14rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.2rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
