import { useState } from "react";
import DemoModal from "./DemoModal";
import { Modal } from "../../context/Modal";

const DemoButton = ({ classNm }) => {
    const [showDemoModal, setShowDemoModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowDemoModal(!showDemoModal)} className={classNm}>Sign In With Demo</button>
            {/* {true && ( */}
            {showDemoModal && (
                <Modal onClose={() => setShowDemoModal(false)}>
                    <DemoModal 
                        setShowDemoModal={setShowDemoModal}
                    />
                </Modal>
            )}
        </>
    )
}

export default DemoButton