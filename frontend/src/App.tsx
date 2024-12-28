import {Button} from "./components/ui/Button.tsx";
import {PlusIcon} from "./components/ui/icons/PlusIcon.tsx";
import {ShareIcon} from "./components/ui/icons/ShareIcon.tsx";

export default function App() {
  return (
    <>
        <Button variant={"primary"} size={"sm"} text={"Add Content"} onClick={() => 1} startIcon={<PlusIcon size={"md"} />} />
        <Button variant={"secondary"} size={"sm"} text={"Share Brain"} onClick={() => 1} startIcon={<ShareIcon size={"md"} />} />
    </>
  )
}
