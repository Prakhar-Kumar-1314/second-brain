import {Button} from "./components/Button.tsx";
import {PlusIcon} from "./icons/PlusIcon.tsx";

export default function App() {
  return (
    <>
        <Button variant={"primary"} size={"md"} text={"Add Content"} startIcon={<PlusIcon  size={"md"}/>} onClick={() => (1)} />
        <Button variant={"secondary"} size={"sm"} text={"Share Brain"} onClick={() => 1} startIcon={<PlusIcon size={"sm"} />} />
    </>
  )
}

