// controlled component
import {useState} from "react";
import {CrossIcon} from "./icons/CrossIcon.tsx";
import {InputElement} from "../InputElement.tsx";
import {Button} from "./Button.tsx";

export const CreateContentModel = ({open, onClose}) => {

    return <div>
        {open && <div className={"w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-70 flex justify-center"}>
            <div className={"flex flex-col justify-center"}>
                <span className={"bg-white-600 opacity-100 p-4 rounded"}>
                    <div onClick={onClose} className={"flex justify-end cursor-pointer"}>
                        <CrossIcon />
                    </div>
                    <div>
                        <InputElement onChange={() => 2} placeholder={"title"} />
                        <InputElement onChange={() => 2} placeholder={"link"} />
                    </div>
                    <div className={"flex justify-center"}>
                        <Button variant={"primary"} size={"sm"} text={"submit"} onClick={() => 2}/>
                    </div>
                </span>
            </div>
        </div>}

    </div>
}