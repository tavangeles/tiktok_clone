import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./hooks/userContext";
import { PageContextProvider } from "./hooks/pageContext";
import Navigation from "./routes/navigation/navigation";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Main from "./routes/main/main";
import ForYou from "./routes/for-you/for-you";
import Upload from "./routes/upload/upload";
import Following from "./routes/following/following";
import Account from "./routes/account/account";
import Search from "./routes/search/search";
import PageNotFound from "./routes/page-not-found/page-not-found";

const App = () => {
    return (
        <UserContextProvider>
            <PageContextProvider>
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route path="/" element={<Main />} >
                            <Route index element={<ForYou />} />
                            <Route path="search/:search" element={<Search />} />
                            <Route path="following" element={<Following />} />
                            <Route path="*" element={<PageNotFound />} />
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