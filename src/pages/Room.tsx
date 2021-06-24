import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
// toast notify
import { showToastNotify } from "../notify/toast";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import "../styles/room.scss";
import { database } from "../services/firebase";
import { useEffect } from "react";

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string;
            avatar: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
    }
>;

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
};

type RooomParams = {
    id: string;
};

export function Room() {
    const params = useParams<RooomParams>();

    const [newQuestion, setNewQuestion] = useState("");
    const [numberOfQuestions, setNumOfQuestions] = useState(0);
    const [roomTitle, setRoomTitle] = useState("");
    const [question, setQuestion] = useState<Question[]>([]);
    const { user, signOutWithGoogle } = useAuth();
    const history = useHistory();
    const roomId = params.id;

    function goToHome() {
        history.push("/");
    }

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on("value", (room) => {
            const databaseRoom = room.val();

            const firebaseQuestions: FirebaseQuestions =
                databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isAnswered: value.isAnswered,
                        isHighlighted: value.isHighlighted,
                    };
                }
            );

            setRoomTitle(databaseRoom.title);
            setQuestion(parsedQuestions);
            setNumOfQuestions(parsedQuestions.length);
        });
    }, [roomId]);

    async function handleCreateNewQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === "") {
            showToastNotify("Corpo da pergunta não pode estar vazio!", "erro");
            return;
        }

        if (!user) {
            showToastNotify(
                "É necessário fazer login para enviar perguntas!",
                "erro"
            );
            return;
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);
        showToastNotify("Pergunta enviada!", "sucess");

        setNumOfQuestions(numberOfQuestions + 1);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img onClick={goToHome} src={logoImg} alt="LetMeAsk" />
                    <div className="extra">
                        <RoomCode code={roomId} />
                        <button
                            className="logout"
                            onClick={() => {
                                signOutWithGoogle();
                                history.push("/");
                            }}
                        >
                            sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="room-title">
                    <h1>Sala {roomTitle}</h1>
                    {numberOfQuestions > 1 ? (
                        <span>{numberOfQuestions} perguntas</span>
                    ) : numberOfQuestions === 0 ? (
                        <span>Nenhuma pergunta nessa sala :(</span>
                    ) : (
                        <span>{numberOfQuestions} pergunta</span>
                    )}
                </div>
                <form onSubmit={handleCreateNewQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={(event) => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Pra enviar uma perguntar,
                                <button> faça seu login</button>.
                            </span>
                        )}
                        <Button
                            type="submit"
                            onClick={handleCreateNewQuestion}
                            disabled={!user}
                        >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
