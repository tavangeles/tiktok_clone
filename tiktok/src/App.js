import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./hooks/userContext";
import Navigation from "./routes/navigation/navigation";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Main from "./routes/main/main";
import ForYou from "./components/for-you/for-you";
import Upload from "./routes/upload/upload";
import Following from "./components/following/following";
import Account from "./routes/account/account";
import { PageContextProvider } from "./hooks/pageContext";

const App = () => {
    return (
        <UserContextProvider>
            <PageContextProvider>
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route path="/" element={<Main />} >
                            <Route index element={<ForYou />} />
                            <Route path="following" element={<Following />} />
                        </Route>
                        <Route path="account/:username" element={<Account />} />
                        <Route path="upload" element={<Upload />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    </Routes>
            </PageContextProvider>
        </UserContextProvider>
    );
};

export default App;
