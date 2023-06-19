import { useParams } from "react-router-dom"

const Workspace = () => {
    const {workspaceId} = useParams();
    

    return (
        <div>workspace</div>
    )
}

export default Workspace