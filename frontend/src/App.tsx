import {Button} from "./components/ui/Button.tsx";
import {PlusIcon} from "./components/ui/icons/PlusIcon.tsx";
import {ShareIcon} from "./components/ui/icons/ShareIcon.tsx";
import {Card} from "./components/ui/Card.tsx";
import {CreateContentModel} from "./components/ui/CreateContentModel.tsx";
import {useState} from "react";
import {Sidebar} from "./components/ui/Sidebar.tsx";

export default function App() {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
        <div>
            <Sidebar />
        </div>
        <div className={"p-4 ml-72 min-h-screen bg-gray100 border-2"}>
            <CreateContentModel open={modalOpen} onClose={() => setModalOpen(false)}/>
            <div className={"pt-2 flex justify-end mr-2"}>
                <Button variant={"primary"} size={"sm"} text={"Add Content"} onClick={() => setModalOpen(true)} startIcon={<PlusIcon size={"md"} />} />
                <Button variant={"secondary"} size={"sm"} text={"Share Brain"} onClick={() => 1} startIcon={<ShareIcon size={"md"} />} />
            </div>
            <div className={'flex gap-4'}>
                <Card title={"First Card Component"} link={"https://x.com/FurqanR/status/1872942637336150451"} type={"twitter"} />
                <Card title={"Youtube Component"} link={"https://www.youtube.com/watch?v=kLBQBTuSKII&t=10s"} type={"youtube"} />
            </div>
        </div>
    </div>
  )
}
