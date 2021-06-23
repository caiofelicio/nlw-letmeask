import copyImg from "../assets/images/copy.svg";

import { showToastNotify } from "../notify/toast";

import "../styles/room_code.scss";

type RoomCodeProps = {
    code: string;
};

export function RoomCode(props: RoomCodeProps) {
    function copyToClipboard() {
        navigator.clipboard.writeText(props.code);
        showToastNotify("Copiado!", "info");
    }

    return (
        <button className="room-code" onClick={copyToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
}
