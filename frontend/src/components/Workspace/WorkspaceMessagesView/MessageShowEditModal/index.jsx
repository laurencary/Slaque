import { FiTrash2 } from "react-icons/fi";

const MessageShowEditModal = () => {
    return (
        <div>
            <header>
                <h1>
                    Message Name
                </h1>
                <button className="close-modal" onClick={() => setShowActions(false)}><FiX /></button>
            </header>
            <section>
                <h3>About</h3>
                <h3>Members<span>MemberCount</span></h3>
            </section>
            <div className="about-container">
                {/* only if owner */}
                <div className="edit-channel-name">
                    <div className="description-header">
                        <h2>Description</h2>
                        <button>Edit</button>
                    </div>
                    <p></p>
                </div>
                <div className="about-content-container">
                    <div className="description-container">
                        <div className="description-header">
                            <h2>Description</h2>
                            <button>Edit</button>
                        </div>
                        <p></p>
                    </div>
                    <div className="created-by-container">
                        <div className="created-by-header"><h2>Created by</h2></div>
                        <p>{"blank"} on {"Month Day, Year"}</p>
                    </div>
                    <div className="leave-channel-container">
                        <button>Leave Channel</button>
                    </div>
                </div>
                <div>
                    <div>
                        <button>
                            <FiTrash2 />
                            <h2>Delete this channel</h2>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageShowEditModal;