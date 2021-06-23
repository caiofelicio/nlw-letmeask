import { useState } from "react";
import { useParams } from "react-router";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import "../styles/room.scss";

type RooomParams = {
    id: string;
};

export function Room() {
    const params = useParams<RooomParams>();
    const [newQuestion, setNewQuestion] = useState("");
    const user = useAuth();
    const roomId = params.id;

    async function handleCreateNewQuestion() {
        if (newQuestion.trim() === "") {
            return;
        }

        if (!user) {
            alert("Faça Login");
            return;
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        <span>
                            Pra enviar uma perguntar,{" "}
                            <button>faça seu login</button>.
                        </span>
                        <Button type="submit" onClick={handleCreateNewQuestion}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
